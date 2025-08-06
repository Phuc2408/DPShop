export default function BestSellingTabs({activeTab, setActiveTab}){
    const tabs = [
        { id: 'electric', name: 'Electric Guitars' },
        { id: 'acoustic', name: 'Acoustic Guitars' },
        { id: 'amplifiers', name: 'Guitar Amplifiers' },
    ]
    return (
        <div className="flex space-x-6 mb-8 text-lg">
            {tabs.map((tab) => (
                <button key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`pb-1 ${
            activeTab === tab.id
              ? 'border-b-2 border-black text-black font-semibold'
              : 'text-gray-600 hover:text-gray-800'
          } transition-colors duration-200`}
                >
                    {tab.name}
                </button>
            ))
            }
        </div>
    );
}