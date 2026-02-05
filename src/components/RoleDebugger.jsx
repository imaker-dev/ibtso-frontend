import React from 'react';
import { useSelector } from 'react-redux';

const RoleDebugger = () => {
  const { meData } = useSelector((state) => state.auth);

  if (!meData) return null;

  return (
    <div className="fixed bottom-4 right-4 bg-gray-900 text-white p-4 rounded-lg shadow-lg text-xs max-w-sm z-50">
      <h3 className="font-bold mb-2">Debug Info:</h3>
      <div className="space-y-1">
        <div><strong>Role:</strong> {meData.role || 'undefined'}</div>
        <div><strong>Name:</strong> {meData.name || 'undefined'}</div>
        <div><strong>Email:</strong> {meData.email || 'undefined'}</div>
        <div className="mt-2 pt-2 border-t border-gray-700">
          <strong>Full meData:</strong>
          <pre className="mt-1 text-xs overflow-auto max-h-40">
            {JSON.stringify(meData, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default RoleDebugger;
