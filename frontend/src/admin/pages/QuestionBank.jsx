import { useState, useEffect, useCallback } from 'react';
import { RiAddLine, RiEditLine, RiDeleteBin2Line, RiFileCopyLine, RiUploadLine } from 'react-icons/ri';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';
import api from '../api/axios';
import DataTable from '../components/DataTable';
import Modal from '../components/Modal';

const diffBadge = (d) => {
  const map = { easy: 'admin-badge-green', moderate: 'admin-badge-yellow', difficult: 'admin-badge-red' };
  return <span className={map[d] || 'admin-badge-gray'}>{d}</span>;
};

export default function QuestionBank() {
  const [questions, setQuestions] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [subjects, setSubjects] = useState([]);
  const [chapters, setChapters] = useState([]);
  const [subChapters, setSubChapters] = useState([]);
  const [filters, setFilters] = useState({ subject: '', chapter: '', subChapter: '', difficulty: '' });
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [selectedIds, setSelectedIds] = useState([]);

  const { register, handleSubmit, reset, watch, formState: { errors, isSubmitting } } = useForm({
    defaultValues: {
      questionText: '', options: [
        { label: 'A', text: '' }, { label: 'B', text: '' },
        { label: 'C', text: '' }, { label: 'D', text: '' },
      ],
      correctAnswer: 'A', explanation: '', difficulty: 'moderate',
      marks: 1, negativeMarks: 0.25, section: 'General', status: 'published',
      subject: '', chapter: '', subChapter: '',
    }
  });

  useEffect(() => {
    api.get('/subjects/dropdown').then(r => setSubjects(r.data.data)).catch(() => {});
  }, []);

  useEffect(() => {
    if (filters.subject) {
      api.get('/chapters', { params: { subject: filters.subject } }).then(r => setChapters(r.data.data)).catch(() => {});
    } else { setChapters([]); }
  }, [filters.subject]);

  useEffect(() => {
    if (filters.chapter) {
      api.get('/subchapters', { params: { chapter: filters.chapter } }).then(r => setSubChapters(r.data.data)).catch(() => {});
    } else { setSubChapters([]); }
  }, [filters.chapter]);

  const fetchQuestions = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await api.get('/questions', {
        params: { page, limit: 20, search, ...filters }
      });
      setQuestions(data.data);
      setTotal(data.pagination.total);
    } catch { toast.error('Failed to load questions'); }
    finally { setLoading(false); }
  }, [page, search, filters]);

  useEffect(() => { fetchQuestions(); }, [fetchQuestions]);

  const openCreate = () => { setEditing(null); reset(); setModalOpen(true); };

  const openEdit = (q) => {
    setEditing(q);
    reset({
      questionText: q.questionText, options: q.options,
      correctAnswer: q.correctAnswer, explanation: q.explanation,
      difficulty: q.difficulty, marks: q.marks, negativeMarks: q.negativeMarks,
      section: q.section, status: q.status,
      subject: q.subject?._id || '', chapter: q.chapter?._id || '',
      subChapter: q.subChapter?._id || '',
    });
    setModalOpen(true);
  };

  const onSubmit = async (values) => {
    try {
      if (editing) {
        await api.put(`/questions/${editing._id}`, values);
        toast.success('Question updated!');
      } else {
        await api.post('/questions', values);
        toast.success('Question created!');
      }
      setModalOpen(false);
      fetchQuestions();
    } catch (err) { toast.error(err.response?.data?.message || 'Save failed'); }
  };

  const handleDelete = async (q) => {
    const result = await Swal.fire({ title: 'Delete question?', icon: 'warning', showCancelButton: true, confirmButtonColor: '#ef4444' });
    if (!result.isConfirmed) return;
    try {
      await api.delete(`/questions/${q._id}`);
      toast.success('Question deleted');
      fetchQuestions();
    } catch (err) { toast.error(err.response?.data?.message || 'Delete failed'); }
  };

  const handleDuplicate = async (id) => {
    try { await api.post(`/questions/${id}/duplicate`); toast.success('Duplicated!'); fetchQuestions(); }
    catch { toast.error('Duplicate failed'); }
  };

  const handleBulkDelete = async () => {
    const result = await Swal.fire({ title: `Delete ${selectedIds.length} questions?`, icon: 'warning', showCancelButton: true, confirmButtonColor: '#ef4444' });
    if (!result.isConfirmed) return;
    try {
      await api.delete('/questions/bulk', { data: { ids: selectedIds } });
      toast.success('Deleted'); setSelectedIds([]); fetchQuestions();
    } catch { toast.error('Bulk delete failed'); }
  };

  const handleImport = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append('file', file);
    try {
      const { data } = await api.post('/questions/import', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
      toast.success(data.message);
      fetchQuestions();
    } catch { toast.error('Import failed'); }
    e.target.value = '';
  };

  const columns = [
    { key: 'questionText', label: 'Question', render: r => (
      <div className="max-w-xs">
        <div className="text-sm text-slate-700 dark:text-slate-300 line-clamp-2" dangerouslySetInnerHTML={{ __html: r.questionText }} />
        <div className="flex items-center gap-2 mt-1 flex-wrap">
          {r.subject?.name && <span className="text-xs text-slate-400">{r.subject.name}</span>}
          {r.chapter?.name && <span className="text-xs text-slate-400">• {r.chapter.name}</span>}
        </div>
      </div>
    )},
    { key: 'difficulty', label: 'Difficulty', render: r => diffBadge(r.difficulty) },
    { key: 'correctAnswer', label: 'Answer', render: r => (
      <span className="w-7 h-7 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-xs font-bold flex items-center justify-center">
        {r.correctAnswer}
      </span>
    )},
    { key: 'marks', label: 'Marks', render: r => `+${r.marks} / -${r.negativeMarks}` },
    { key: 'status', label: 'Status', render: r => (
      <span className={r.status === 'published' ? 'admin-badge-green' : 'admin-badge-yellow'}>{r.status}</span>
    )},
    { key: 'actions', label: 'Actions', render: r => (
      <div className="flex items-center gap-1">
        <button onClick={() => openEdit(r)} className="p-1.5 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 text-blue-600 transition-colors"><RiEditLine className="w-4 h-4" /></button>
        <button onClick={() => handleDuplicate(r._id)} className="p-1.5 rounded-lg hover:bg-purple-50 dark:hover:bg-purple-900/20 text-purple-600 transition-colors"><RiFileCopyLine className="w-4 h-4" /></button>
        <button onClick={() => handleDelete(r)} className="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-red-500 transition-colors"><RiDeleteBin2Line className="w-4 h-4" /></button>
      </div>
    )},
  ];

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Question Bank</h2>
          <p className="text-sm text-slate-500 mt-0.5">Manage all questions with subject/chapter hierarchy</p>
        </div>
      </div>

      <div className="admin-card p-4">
        <div className="flex flex-wrap gap-3">
          <select value={filters.subject} onChange={e => setFilters(f => ({ ...f, subject: e.target.value, chapter: '', subChapter: '' }))} className="admin-input w-40">
            <option value="">All Subjects</option>
            {subjects.map(s => <option key={s._id} value={s._id}>{s.name}</option>)}
          </select>
          <select value={filters.chapter} onChange={e => setFilters(f => ({ ...f, chapter: e.target.value, subChapter: '' }))} className="admin-input w-40" disabled={!filters.subject}>
            <option value="">All Chapters</option>
            {chapters.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
          </select>
          <select value={filters.subChapter} onChange={e => setFilters(f => ({ ...f, subChapter: e.target.value }))} className="admin-input w-40" disabled={!filters.chapter}>
            <option value="">All Sub-Chapters</option>
            {subChapters.map(sc => <option key={sc._id} value={sc._id}>{sc.name}</option>)}
          </select>
          <select value={filters.difficulty} onChange={e => setFilters(f => ({ ...f, difficulty: e.target.value }))} className="admin-input w-36">
            <option value="">All Difficulty</option>
            <option value="easy">Easy</option>
            <option value="moderate">Moderate</option>
            <option value="difficult">Difficult</option>
          </select>
          <button onClick={() => setFilters({ subject: '', chapter: '', subChapter: '', difficulty: '' })} className="admin-btn-secondary text-xs">Clear Filters</button>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={questions}
        total={total}
        page={page}
        limit={20}
        loading={loading}
        onPageChange={setPage}
        search={search}
        onSearch={(v) => { setSearch(v); setPage(1); }}
        searchPlaceholder="Search questions..."
        selectedIds={selectedIds}
        onSelectionChange={setSelectedIds}
        onBulkDelete={handleBulkDelete}
        emptyMessage="No questions found. Create or import questions."
        actions={
          <div className="flex items-center gap-2">
            <label className="admin-btn-secondary cursor-pointer">
              <RiUploadLine className="w-4 h-4" /> Import Excel
              <input type="file" accept=".xlsx,.csv" onChange={handleImport} className="hidden" />
            </label>
            <button onClick={openCreate} className="admin-btn-primary">
              <RiAddLine className="w-4 h-4" /> Add Question
            </button>
          </div>
        }
      />

      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editing ? 'Edit Question' : 'Create Question'}
        size="lg"
        footer={
          <>
            <button onClick={() => setModalOpen(false)} className="admin-btn-secondary">Cancel</button>
            <button form="question-form" type="submit" disabled={isSubmitting} className="admin-btn-primary">
              {isSubmitting ? 'Saving...' : editing ? 'Update' : 'Create'}
            </button>
          </>
        }
      >
        <form id="question-form" onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="admin-label">Question Text *</label>
            <textarea {...register('questionText', { required: 'Question text required' })} rows={3} className="admin-input resize-none" placeholder="Enter question..." />
            {errors.questionText && <p className="text-red-500 text-xs mt-1">{errors.questionText.message}</p>}
          </div>

          <div className="space-y-2">
            <label className="admin-label">Options *</label>
            {['A', 'B', 'C', 'D'].map((label, i) => (
              <div key={label} className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-slate-200 dark:bg-slate-700 text-xs font-bold flex items-center justify-center flex-shrink-0 text-slate-600 dark:text-slate-300">{label}</span>
                <input {...register(`options.${i}.text`, { required: 'Option required' })} className="admin-input" placeholder={`Option ${label}`} />
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="admin-label">Correct Answer *</label>
              <select {...register('correctAnswer')} className="admin-input">
                {['A', 'B', 'C', 'D'].map(l => <option key={l} value={l}>Option {l}</option>)}
              </select>
            </div>
            <div>
              <label className="admin-label">Difficulty</label>
              <select {...register('difficulty')} className="admin-input">
                <option value="easy">Easy</option>
                <option value="moderate">Moderate</option>
                <option value="difficult">Difficult</option>
              </select>
            </div>
          </div>

          <div>
            <label className="admin-label">Explanation</label>
            <textarea {...register('explanation')} rows={2} className="admin-input resize-none" placeholder="Explanation for the correct answer..." />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="admin-label">Marks</label>
              <input {...register('marks', { valueAsNumber: true })} type="number" step="0.5" className="admin-input" />
            </div>
            <div>
              <label className="admin-label">Negative Marks</label>
              <input {...register('negativeMarks', { valueAsNumber: true })} type="number" step="0.25" className="admin-input" />
            </div>
            <div>
              <label className="admin-label">Status</label>
              <select {...register('status')} className="admin-input">
                <option value="published">Published</option>
                <option value="draft">Draft</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="admin-label">Subject</label>
              <select {...register('subject')} className="admin-input">
                <option value="">Select subject</option>
                {subjects.map(s => <option key={s._id} value={s._id}>{s.name}</option>)}
              </select>
            </div>
            <div>
              <label className="admin-label">Section</label>
              <input {...register('section')} className="admin-input" placeholder="Reasoning, Math, GK..." />
            </div>
          </div>
        </form>
      </Modal>
    </div>
  );
}
