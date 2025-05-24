import React, { useState } from 'react';
import HostTopbar from '../../components/Internship/hosts/HostTopbar';
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
          <div className="flex-1 flex items-center justify-center bg-gray-50 h-screen">
            <div className="max-w-2xl w-full px-6 text-center">
              <h1 className="text-3xl font-semibold text-gray-800 mb-3">
                Welcome to the Internship Manager
              </h1>
              <p className="text-gray-600 text-lg">
                Manage your internship postings and view student applications all in one place.
              </p>
            </div>
          </div>

        );
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <HostTopbar />
      <div className="flex flex-1">
        <HostSidebar setActivePage={setActivePage} activePage={activePage} />
        <div className="flex-1 overflow-auto bg-gray-50">{renderContent()}</div>
      </div>
    </div>
  );
};

export default InternshipManager;
