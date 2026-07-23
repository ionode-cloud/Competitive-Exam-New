import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  RiAddLine, RiEditLine, RiDeleteBin2Line, RiTimeLine,
  RiCheckboxCircleLine, RiPauseLine, RiAlertLine, RiDragMoveLine,
  RiShuffleLine, RiCalendarEventLine, RiFolderSettingsLine, RiCheckLine
} from 'react-icons/ri';
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, useSortable, arrayMove } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';
import api from '../api/axios';
import DataTable from '../components/DataTable';
import Modal from '../components/Modal';

function SortableQuestionRow({ item, index, onRemove }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: item._id || item.question?._id || String(Math.random())
  });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const q = item.question || {};
  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex items-center gap-3 p-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl hover:border-primary-400 transition-all shadow-sm"
    >
      <button {...attributes} {...listeners} className="cursor-grab text-slate-400 hover:text-slate-600 dark:hover:text-white p-1 touch-none">
        <RiDragMoveLine className="w-4 h-4" />
      </button>
      <span className="w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 font-bold text-xs flex items-center justify-center flex-shrink-0">
        {index + 1}
      </span>
      <div className="flex-1 min-w-0">
        <div className="text-sm font-medium text-slate-800 dark:text-slate-200 truncate" dangerouslySetInnerHTML={{ __html: q.questionText || 'Question text unavailable' }} />
        <div className="flex items-center gap-2 mt-1 text-xs text-slate-400">
          <span>Section: {item.section || q.section || 'General'}</span>
          <span>• Mark: +{item.marks || 1}</span>
          <span>• Negative: -{item.negativeMarks !== undefined ? item.negativeMarks : 0.25}</span>
        </div>
      </div>
      <button onClick={onRemove} className="p-1.5 text-red-400 hover:text-red-600 transition-colors" title="Remove Question">
        <RiDeleteBin2Line className="w-4 h-4" />
      </button>
    </div>
  );
}

export default function ManageMockTest() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  // Modal States
  const [scheduleModal, setScheduleModal] = useState(false);
  const [schedulingTest, setSchedulingTest] = useState(null);

  const [reorderModal, setReorderModal] = useState(false);
  const [reorderingTest, setReorderingTest] = useState(null);
  const [questionsList, setQuestionsList] = useState([]);
  const [shuffleQuestions, setShuffleQuestions] = useState(false);
  const [shuffleOptions, setShuffleOptions] = useState(false);

  // Form state for scheduling
  const [scheduleDates, setScheduleDates] = useState({
    publishAt: '',
    examStartTime: '',
    examEndTime: '',
  });

  const sensors = useSensors(useSensor(PointerSensor));

  const fetchMockTests = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.get('/mocktests', { params: { page, limit: 10, search } });
      setData(res.data.data);
      setTotal(res.data.pagination.total);
    } catch {
      toast.error('Failed to load mock tests');
    } finally {
      setLoading(false);
    }
  }, [page, search]);

  useEffect(() => {
    fetchMockTests();
  }, [fetchMockTests]);

  // 1. Active / Deactive Toggle
  const handleToggleStatus = async (item) => {
    const newStatus = item.status === 'published' ? 'deactivated' : 'published';
    try {
      await api.put(`/mocktests/${item._id}`, { status: newStatus });
      toast.success(newStatus === 'published' ? 'Mock Test Activated!' : 'Mock Test Deactivated');
      fetchMockTests();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Status update failed');
    }
  };

  // 2. Delete Mock Test
  const handleDelete = async (item) => {
    const result = await Swal.fire({
      title: `Delete "${item.name}"?`,
      text: 'This will delete the test and remove all questions attached.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      confirmButtonText: 'Yes, Delete',
    });
    if (!result.isConfirmed) return;

    try {
      await api.delete(`/mocktests/${item._id}`);
      toast.success('Mock Test deleted');
      fetchMockTests();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Delete failed');
    }
  };

  // 3. Schedule Timer & Publish Date
  const openScheduleModal = (item) => {
    if (item.completedQuestions < item.totalQuestions) {
      toast.error(`Questions incomplete! You can only set the timer once you complete all ${item.totalQuestions} questions (Currently ${item.completedQuestions}/${item.totalQuestions}).`);
      return;
    }
    setSchedulingTest(item);
    setScheduleDates({
      publishAt: item.publishAt ? new Date(item.publishAt).toISOString().slice(0, 16) : '',
      examStartTime: item.examStartTime ? new Date(item.examStartTime).toISOString().slice(0, 16) : '',
      examEndTime: item.examEndTime ? new Date(item.examEndTime).toISOString().slice(0, 16) : '',
    });
    setScheduleModal(true);
  };

  const handleSaveSchedule = async (e) => {
    e.preventDefault();
    if (!schedulingTest) return;
    try {
      await api.patch(`/mocktests/${schedulingTest._id}/schedule`, scheduleDates);
      toast.success('Publish date & Schedule timer saved! Exam will activate live at the scheduled time.');
      setScheduleModal(false);
      fetchMockTests();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to schedule exam');
    }
  };

  // 4. Ordering Questions & Drag Replace
  const openReorderModal = async (item) => {
    setReorderingTest(item);
    setShuffleQuestions(item.shuffleQuestions || false);
    setShuffleOptions(item.shuffleOptions || false);
    try {
      const res = await api.get(`/mocktests/${item._id}`);
      setQuestionsList(res.data.data.questions || []);
      setReorderModal(true);
    } catch {
      toast.error('Failed to load test questions');
    }
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = questionsList.findIndex(q => (q.question?._id || q._id) === active.id);
    const newIndex = questionsList.findIndex(q => (q.question?._id || q._id) === over.id);
    const reordered = arrayMove(questionsList, oldIndex, newIndex);
    setQuestionsList(reordered);
  };

  const handleSaveQuestionOrder = async () => {
    if (!reorderingTest) return;
    try {
      const orderedIds = questionsList.map(q => q.question?._id || q._id);
      await Promise.all([
        api.patch(`/mocktests/${reorderingTest._id}/questions/reorder`, { orderedIds }),
        api.put(`/mocktests/${reorderingTest._id}`, { shuffleQuestions, shuffleOptions })
      ]);
      toast.success('Question ordering & shuffle settings saved!');
      setReorderModal(false);
      fetchMockTests();
    } catch {
      toast.error('Save failed');
    }
  };

  const handleRemoveQuestionFromList = (questionId) => {
    setQuestionsList(prev => prev.filter(q => (q.question?._id || q._id) !== questionId));
  };

  const columns = [
    {
      key: 'name',
      label: 'Mock Test Name',
      sortable: true,
      render: r => (
        <div>
          <p className="font-semibold text-slate-800 dark:text-white text-sm font-mono">{r.name}</p>
          <p className="text-xs text-slate-400 mt-0.5">
            Paper: <span className="font-semibold">{r.examPaper || 'RI'}</span> • Type: <span className="capitalize">{r.testType?.replace('_', ' ')}</span>
          </p>
        </div>
      )
    },
    {
      key: 'status',
      label: 'active / deactive',
      render: r => (
        <div className="flex items-center gap-2">
          {r.status === 'published' ? (
            <span className="admin-badge-green flex items-center gap-1 font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Active
            </span>
          ) : (
            <span className="admin-badge-red font-semibold">Deactive</span>
          )}

          <button
            onClick={() => handleToggleStatus(r)}
            className={`px-2 py-1 text-xs font-semibold rounded-md border transition-colors ${
              r.status === 'published'
                ? 'border-orange-300 text-orange-600 hover:bg-orange-50 dark:hover:bg-orange-900/20'
                : 'border-emerald-300 text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/20'
            }`}
            title={r.status === 'published' ? 'Click to Deactivate' : 'Click to Activate'}
          >
            {r.status === 'published' ? 'Deactivate' : 'Activate'}
          </button>
        </div>
      )
    },
    {
      key: 'warning',
      label: 'Warning / Progress',
      render: r => {
        const completed = r.completedQuestions || 0;
        const totalQ = r.totalQuestions || 100;
        const remaining = totalQ - completed;
        const isComplete = completed >= totalQ;

        return (
          <div>
            <div className="flex items-center gap-2">
              <span className={`font-mono text-xs font-bold px-2 py-0.5 rounded-md ${
                isComplete ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300' : 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300'
              }`}>
                {completed}/{totalQ}
              </span>

              {!isComplete && (
                <span className="text-[11px] text-red-500 font-bold flex items-center gap-0.5 bg-red-50 dark:bg-red-900/20 px-1.5 py-0.5 rounded">
                  <RiAlertLine className="w-3 h-3" /> {remaining} left
                </span>
              )}
            </div>
            <div className="w-24 h-1 bg-slate-200 dark:bg-slate-700 rounded-full mt-1 overflow-hidden">
              <div
                className={`h-full transition-all ${isComplete ? 'bg-emerald-500' : 'bg-amber-500'}`}
                style={{ width: `${Math.min(100, (completed / totalQ) * 100)}%` }}
              />
            </div>
          </div>
        );
      }
    },
    {
      key: 'scheduleTime',
      label: 'Publish Date & Timer',
      render: r => (
        <div className="text-xs">
          {r.examStartTime ? (
            <div>
              <p className="font-semibold text-primary-600 dark:text-primary-400 flex items-center gap-1">
                <RiCalendarEventLine className="w-3.5 h-3.5" /> Scheduled Live
              </p>
              <p className="text-slate-500 text-[11px] mt-0.5">
                {new Date(r.examStartTime).toLocaleString('en-IN', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          ) : (
            <span className="text-slate-400 italic">No timer set</span>
          )}
        </div>
      )
    },
    {
      key: 'shuffle',
      label: 'Shuffle',
      render: r => (
        <div className="flex items-center gap-1 text-[11px]">
          <span className={`px-1.5 py-0.5 rounded font-semibold ${r.shuffleQuestions ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300' : 'bg-slate-100 text-slate-500 dark:bg-slate-800'}`}>
            Q: {r.shuffleQuestions ? 'On' : 'Off'}
          </span>
          <span className={`px-1.5 py-0.5 rounded font-semibold ${r.shuffleOptions ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300' : 'bg-slate-100 text-slate-500 dark:bg-slate-800'}`}>
            Opt: {r.shuffleOptions ? 'On' : 'Off'}
          </span>
        </div>
      )
    },
    {
      key: 'actions',
      label: 'Actions',
      render: r => (
        <div className="flex items-center gap-1.5 flex-wrap">
          {/* Edit */}
          <button
            onClick={() => navigate(`/admin/mock-tests/${r._id}/edit`)}
            className="p-1.5 bg-blue-50 hover:bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:hover:bg-blue-900/40 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors"
            title="Edit Mock Test"
          >
            <RiEditLine className="w-3.5 h-3.5" /> Edit
          </button>

          {/* Schedule Timer */}
          <button
            onClick={() => openScheduleModal(r)}
            className="p-1.5 bg-purple-50 hover:bg-purple-100 text-purple-600 dark:bg-purple-900/20 dark:hover:bg-purple-900/40 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors"
            title="Schedule Exam Live Timer"
          >
            <RiTimeLine className="w-3.5 h-3.5" /> Schedule
          </button>

          {/* Questions Drag Replace */}
          <button
            onClick={() => openReorderModal(r)}
            className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-300 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors"
            title="Order & Reorder Questions"
          >
            <RiDragMoveLine className="w-3.5 h-3.5" /> Order
          </button>

          {/* Delete */}
          <button
            onClick={() => handleDelete(r)}
            className="p-1.5 bg-red-50 hover:bg-red-100 text-red-600 dark:bg-red-900/20 dark:hover:bg-red-900/40 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors"
            title="Delete Test"
          >
            <RiDeleteBin2Line className="w-3.5 h-3.5" /> Delete
          </button>
        </div>
      )
    },
  ];

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <RiFolderSettingsLine className="w-6 h-6 text-primary-600" /> Manage MockTest
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Manage test active/deactive state, schedule live exam timers, question ordering, and warnings
          </p>
        </div>
        <button onClick={() => navigate('/admin/mock-tests/create')} className="admin-btn-primary">
          <RiAddLine className="w-4 h-4" /> Create Mock Test
        </button>
      </div>

      <DataTable
        columns={columns}
        data={data}
        total={total}
        page={page}
        limit={10}
        loading={loading}
        onPageChange={setPage}
        search={search}
        onSearch={(v) => { setSearch(v); setPage(1); }}
        searchPlaceholder="Search mock tests by name..."
        emptyMessage="No mock tests found."
      />

      {/* 1. Schedule Exam Timer & Publish Date Modal */}
      <Modal
        isOpen={scheduleModal}
        onClose={() => setScheduleModal(false)}
        title={`Schedule Live Exam Timer: ${schedulingTest?.name}`}
        size="md"
        footer={
          <>
            <button type="button" onClick={() => setScheduleModal(false)} className="admin-btn-secondary">
              Cancel
            </button>
            <button type="button" onClick={handleSaveSchedule} className="admin-btn-primary">
              Save Schedule Timer
            </button>
          </>
        }
      >
        <form onSubmit={handleSaveSchedule} className="space-y-4">
          <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-xl border border-blue-200 dark:border-blue-800 text-xs text-blue-800 dark:text-blue-300">
            <p className="font-semibold flex items-center gap-1">
              <RiTimeLine className="w-4 h-4" /> Automated Live Schedule Timer
            </p>
            <p className="mt-1">
              Setting the timer will automatically activate the exam live for students once the scheduled time is reached.
            </p>
          </div>

          <div>
            <label className="admin-label">Publish Date & Time *</label>
            <input
              type="datetime-local"
              value={scheduleDates.publishAt}
              onChange={e => setScheduleDates(d => ({ ...d, publishAt: e.target.value }))}
              className="admin-input"
            />
          </div>

          <div>
            <label className="admin-label">Schedule Exam Live Start Time *</label>
            <input
              type="datetime-local"
              value={scheduleDates.examStartTime}
              onChange={e => setScheduleDates(d => ({ ...d, examStartTime: e.target.value }))}
              className="admin-input"
            />
          </div>

          <div>
            <label className="admin-label">Schedule Exam Live End Time *</label>
            <input
              type="datetime-local"
              value={scheduleDates.examEndTime}
              onChange={e => setScheduleDates(d => ({ ...d, examEndTime: e.target.value }))}
              className="admin-input"
            />
          </div>
        </form>
      </Modal>

      {/* 2. Drag & Replace Question Ordering & Shuffle Modal */}
      <Modal
        isOpen={reorderModal}
        onClose={() => setReorderModal(false)}
        title={`Order & Replace Questions: ${reorderingTest?.name}`}
        size="lg"
        footer={
          <>
            <p className="text-xs text-slate-400 mr-auto">{questionsList.length} questions loaded</p>
            <button type="button" onClick={() => setReorderModal(false)} className="admin-btn-secondary">
              Cancel
            </button>
            <button type="button" onClick={handleSaveQuestionOrder} className="admin-btn-primary">
              Save Question Order & Shuffle
            </button>
          </>
        }
      >
        <div className="space-y-4">
          {/* Optional Shuffle Settings */}
          <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
              <RiShuffleLine className="w-4 h-4 text-purple-600" /> Optional Shuffle Settings
            </span>
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 cursor-pointer text-xs">
                <input
                  type="checkbox"
                  checked={shuffleQuestions}
                  onChange={e => setShuffleQuestions(e.target.checked)}
                  className="rounded text-primary-600"
                />
                <span>Shuffle Questions</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer text-xs">
                <input
                  type="checkbox"
                  checked={shuffleOptions}
                  onChange={e => setShuffleOptions(e.target.checked)}
                  className="rounded text-primary-600"
                />
                <span>Shuffle Options</span>
              </label>
            </div>
          </div>

          <p className="text-xs text-slate-400">
            Drag the handle icons to replace question positions in order:
          </p>

          {/* Drag Replace Question List */}
          {questionsList.length === 0 ? (
            <p className="text-center py-8 text-slate-400 text-sm">No questions in this test yet.</p>
          ) : (
            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
              <SortableContext
                items={questionsList.map(q => q.question?._id || q._id || String(Math.random()))}
                strategy={verticalListSortingStrategy}
              >
                <div className="space-y-2 max-h-[350px] overflow-y-auto pr-1">
                  {questionsList.map((item, idx) => (
                    <SortableQuestionRow
                      key={item.question?._id || item._id || idx}
                      item={item}
                      index={idx}
                      onRemove={() => handleRemoveQuestionFromList(item.question?._id || item._id)}
                    />
                  ))}
                </div>
              </SortableContext>
            </DndContext>
          )}
        </div>
      </Modal>
    </div>
  );
}
