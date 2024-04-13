import React, { useState } from 'react';

function ProductTabs({ aboutThisItem, additionalInformation }) {
  const [activeTab, setActiveTab] = useState('about');

  const TabContent = () => {
    switch (activeTab) {
      case 'about':
        return <ul className="list-disc ml-5">{aboutThisItem.map((item, index) => <li key={index}>{item}</li>)}</ul>;
      case 'specs':
        return <table className="min-w-full divide-y divide-gray-200 mt-4">
          <tbody className="bg-white divide-y divide-gray-200">
            {Object.entries(additionalInformation).map(([key, value], index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{key}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{value}</td>
              </tr>
            ))}
          </tbody>
        </table>;
      default:
        return null;
    }
  };

  return (
    <div>
      <div className="tabs flex space-x-4 border-b pb-2">
        <button className={`tab ${activeTab === 'about' ? 'text-blue-500' : 'text-gray-500'}`} onClick={() => setActiveTab('about')}>About</button>
        <button className={`tab ${activeTab === 'specs' ? 'text-blue-500' : 'text-gray-500'}`} onClick={() => setActiveTab('specs')}>Specifications</button>
      </div>
      <div className="tab-content mt-4">
        <TabContent />
      </div>
    </div>
  );
}

export default ProductTabs;
