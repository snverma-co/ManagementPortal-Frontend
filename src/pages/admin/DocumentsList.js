import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDocuments, deleteDocument, uploadDocument, downloadDocument } from '../../store/slices/documentSlice';

const DocumentsList = () => {
  const dispatch = useDispatch();
  const { documents, isLoading } = useSelector((state) => state.documents);
  const { clients } = useSelector((state) => state.clients);
  const { tasks } = useSelector((state) => state.tasks);
  
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadForm, setUploadForm] = useState({
    name: '',
    description: '',
    clientId: '',
    taskId: '',
    file: null
  });
  
  useEffect(() => {
    dispatch(getDocuments());
  }, [dispatch]);
  
  // Update the handleDownload function to use the downloadDocument action
  const handleDownload = (document) => {
    dispatch(downloadDocument(document._id));
  };
  
  const handleUploadFormChange = (e) => {
    if (e.target.name === 'file') {
      setUploadForm({ ...uploadForm, file: e.target.files[0] });
    } else {
      setUploadForm({ ...uploadForm, [e.target.name]: e.target.value });
    }
  };
  
  const handleUploadSubmit = (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('name', uploadForm.name);
    formData.append('description', uploadForm.description);
    formData.append('clientId', uploadForm.clientId);
    if (uploadForm.taskId) formData.append('taskId', uploadForm.taskId);
    formData.append('file', uploadForm.file);
    
    dispatch(uploadDocument(formData));
    setShowUploadModal(false);
    setUploadForm({
      name: '',
      description: '',
      clientId: '',
      taskId: '',
      file: null
    });
  };
  
  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Documents</h2>
        <button
          onClick={() => setShowUploadModal(true)}
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition duration-200"
        >
          Upload Document
        </button>
      </div>
      
      {/* Document Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4">Upload Document</h3>
            <form onSubmit={handleUploadSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                  Document Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={uploadForm.name}
                  onChange={handleUploadFormChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={uploadForm.description}
                  onChange={handleUploadFormChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  rows="2"
                ></textarea>
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="clientId">
                  Client
                </label>
                <select
                  id="clientId"
                  name="clientId"
                  value={uploadForm.clientId}
                  onChange={handleUploadFormChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                >
                  <option value="">Select a client</option>
                  {clients && clients.map(client => (
                    <option key={client._id} value={client._id}>{client.name}</option>
                  ))}
                </select>
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="taskId">
                  Related Task (Optional)
                </label>
                <select
                  id="taskId"
                  name="taskId"
                  value={uploadForm.taskId}
                  onChange={handleUploadFormChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                >
                  <option value="">Select a task (optional)</option>
                  {tasks && tasks.map(task => (
                    <option key={task._id} value={task._id}>{task.title}</option>
                  ))}
                </select>
              </div>
              
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="file">
                  File
                </label>
                <input
                  type="file"
                  id="file"
                  name="file"
                  onChange={handleUploadFormChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              
              <div className="flex items-center justify-between">
                <button
                  type="submit"
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-200"
                >
                  Upload
                </button>
                <button
                  type="button"
                  onClick={() => setShowUploadModal(false)}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-200"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      
      {/* Rest of the component */}
      {isLoading ? (
        <p className="text-center py-4">Loading documents...</p>
      ) : documents.length === 0 ? (
        <p className="text-center py-4">No documents found. Upload your first document!</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">Name</th>
                <th className="py-3 px-6 text-left">Client</th>
                <th className="py-3 px-6 text-left">Type</th>
                <th className="py-3 px-6 text-left">Uploaded By</th>
                <th className="py-3 px-6 text-left">Date</th>
                <th className="py-3 px-6 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm">
              {documents.map((document) => (
                <tr key={document._id} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="py-3 px-6 text-left">{document.name}</td>
                  <td className="py-3 px-6 text-left">{document.client?.name || 'N/A'}</td>
                  <td className="py-3 px-6 text-left">{document.fileType}</td>
                  <td className="py-3 px-6 text-left">{document.uploadedBy?.name || 'N/A'}</td>
                  <td className="py-3 px-6 text-left">
                    {new Date(document.createdAt).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-6 text-center">
                    <div className="flex item-center justify-center">
                      <button
                        onClick={() => handleDownload(document)}
                        className="text-indigo-600 hover:text-indigo-900 mx-2"
                      >
                        Download
                      </button>
                      <button
                        onClick={() => {
                          if(window.confirm('Are you sure you want to delete this document?')) {
                            dispatch(deleteDocument(document._id));
                          }
                        }}
                        className="text-red-600 hover:text-red-900 mx-2"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default DocumentsList;