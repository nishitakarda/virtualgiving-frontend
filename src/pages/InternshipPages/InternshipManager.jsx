import React, { useState } from 'react';
import HostSidebar from '../../components/Internship/hosts/HostSidebar';
import PostInternships from '../../components/Internship/hosts/PostInternships';
import ViewApplications from '../../components/Internship/hosts/ViewApplications';

const InternshipManager = () => {
  const [activePage, setActivePage] = useState('welcome');

  const renderContent = () => {
    switch (activePage) {
      case 'post':
        return <PostInternships />;
      case 'view':
        return <ViewApplications />;
      default:
        return (
          <div className="flex-1 flex items-center justify-center bg-gray-50 dark:bg-gray-800 h-screen">
            <div className="max-w-2xl w-full px-6 text-center">
              <h1 className="text-3xl font-semibold text-gray-800 dark:text-gray-200 mb-3">
                Welcome to the Internship Manager
              </h1>
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                Manage your internship postings and view student applications all in one place.
              </p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="flex flex-col h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <div className="flex flex-1">
        <HostSidebar setActivePage={setActivePage} activePage={activePage} />
        <div className="flex-1 overflow-auto bg-gray-50 dark:bg-gray-800 p-6">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default InternshipManager;
