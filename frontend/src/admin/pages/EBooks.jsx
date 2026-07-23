import { useState, useEffect, useCallback } from 'react';
import { RiAddLine, RiEditLine, RiDeleteBin2Line, RiDownloadLine } from 'react-icons/ri';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';
import api from '../api/axios';
import DataTable from '../components/DataTable';
import Modal from '../components/Modal';

export default function EBooks() {
  const [ebooks, setEbooks] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [subjects, setSubjects] = useState([]);

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm();

  useEffect(() => { api.get('/subjects/dropdown').then(r => setSubjects(r.data.data)).catch(() => {}); }, []);

  const fetchEbooks = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await api.get('/ebooks', { params: { page, limit: 10, search } });
      setEbooks(data.data); setTotal(data.pagination.total);
    } catch { toast.error('Failed to load e-books'); }
    finally { setLoading(false); }
  }, [page, search]);

  useEffect(() => { fetchEbooks(); }, [fetchEbooks]);

  const openCreate = () => { setEditing(null); reset(); setModalOpen(true); };
  const openEdit = (e) => { setEditing(e); reset({ title: e.title, subject: e.subject?._id, description: e.description, price: e.price, status: e.status, isFree: e.isFree }); setModalOpen(true); };

  const onSubmit = async (values) => {
    try {
      const formData = new FormData();
      Object.entries(values).forEach(([k, v]) => { if (v !== undefined && v !== null) formData.append(k, v); });
      if (values.pdfFile?.[0]) formData.set('pdf', values.pdfFile[0]);
      if (values.thumbnailFile?.[0]) formData.set('thumbnail', values.thumbnailFile[0]);

      const headers = { 'Content-Type': 'multipart/form-data' };
      if (editing) await api.put(`/ebooks/${editing._id}`, formData, { headers });
      else await api.post('/ebooks', formData, { headers });
      toast.success(editing ? 'E-Book updated!' : 'E-Book created!');
      setModalOpen(false); fetchEbooks();
    } catch (err) { toast.error(err.response?.data?.message || 'Save failed'); }
  };

  const handleDelete = async (e) => {
    const result = await Swal.fire({ title: `Delete "${e.title}"?`, icon: 'warning', showCancelButton: true, confirmButtonColor: '#ef4444' });
    if (!result.isConfirmed) return;
    try { await api.delete(`/ebooks/${e._id}`); toast.success('Deleted'); fetchEbooks(); }
    catch (err) { toast.error(err.response?.data?.message || 'Delete failed'); }
  };

  const columns = [
    { key: 'title', label: 'Book Name', render: r => (
      <div className="flex items-center gap-3">
        {r.thumbnail
          ? <img src={r.thumbnail} alt="" className="w-10 h-12 object-cover rounded" />
          : <div className="w-10 h-12 bg-slate-200 dark:bg-slate-700 rounded flex items-center justify-center text-slate-400 text-xs">PDF</div>}
        <div>
          <p className="font-semibold text-slate-800 dark:text-white text-sm">{r.title}</p>
          <p className="text-xs text-slate-400">{r.subject?.name}</p>
        </div>
      </div>
    )},
    { key: 'status', label: 'Status', render: r => <span className={r.status === 'published' ? 'admin-badge-green' : 'admin-badge-yellow'}>{r.status}</span> },
    { key: 'price', label: 'Price', render: r => r.isFree ? <span className="admin-badge-green">Free</span> : `₹${r.price}` },
    { key: 'downloadCount', label: 'Downloads', render: r => (
      <span className="flex items-center gap-1 text-slate-600 dark:text-slate-300"><RiDownloadLine className="w-3 h-3" />{r.downloadCount || 0}</span>
    )},
    { key: 'actions', label: 'Actions', render: r => (
      <div className="flex items-center gap-1">
        <button onClick={() => openEdit(r)} className="p-1.5 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 text-blue-600 transition-colors"><RiEditLine className="w-4 h-4" /></button>
        <button onClick={() => handleDelete(r)} className="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-red-500 transition-colors"><RiDeleteBin2Line className="w-4 h-4" /></button>
      </div>
    )},
  ];

  return (
    <div className="space-y-5">
      <h2 className="text-xl font-bold text-slate-900 dark:text-white">PYQ E-Books</h2>
      <DataTable columns={columns} data={ebooks} total={total} page={page} limit={10} loading={loading} onPageChange={setPage}
        search={search} onSearch={(v) => { setSearch(v); setPage(1); }} searchPlaceholder="Search e-books..."
        emptyMessage="No e-books found."
        actions={<button onClick={openCreate} className="admin-btn-primary"><RiAddLine className="w-4 h-4" /> Add E-Book</button>}
      />
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Edit E-Book' : 'Upload E-Book'} size="md"
        footer={<><button onClick={() => setModalOpen(false)} className="admin-btn-secondary">Cancel</button><button form="ebook-form" type="submit" disabled={isSubmitting} className="admin-btn-primary">{isSubmitting ? 'Saving...' : editing ? 'Update' : 'Upload'}</button></>}
      >
        <form id="ebook-form" onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="admin-label">Book Title *</label>
            <input {...register('title', { required: 'Title required' })} className="admin-input" />
            {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="admin-label">Subject *</label>
              <select {...register('subject', { required: 'Subject required' })} className="admin-input">
                <option value="">Select...</option>
                {subjects.map(s => <option key={s._id} value={s._id}>{s.name}</option>)}
              </select>
            </div>
            <div>
              <label className="admin-label">Status</label>
              <select {...register('status')} className="admin-input">
                <option value="published">Published</option>
                <option value="draft">Draft</option>
              </select>
            </div>
          </div>
          <div>
            <label className="admin-label">Description</label>
            <textarea {...register('description')} rows={2} className="admin-input resize-none" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="admin-label">PDF File {!editing && '*'}</label>
              <input {...register('pdfFile', { required: !editing ? 'PDF required' : false })} type="file" accept=".pdf" className="admin-input text-xs" />
            </div>
            <div>
              <label className="admin-label">Thumbnail</label>
              <input {...register('thumbnailFile')} type="file" accept="image/*" className="admin-input text-xs" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="admin-label">Price (₹)</label>
              <input {...register('price', { valueAsNumber: true })} type="number" min="0" className="admin-input" defaultValue={0} />
            </div>
            <div className="flex items-center gap-2 pt-6">
              <input {...register('isFree')} type="checkbox" className="rounded text-primary-600" />
              <label className="text-sm text-slate-600 dark:text-slate-400">Free Download</label>
            </div>
          </div>
        </form>
      </Modal>
    </div>
  );
}
