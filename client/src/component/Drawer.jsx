export default function Drawer({ isOpen, onClose, children }) {
    return (
        <>
            {isOpen && (
                <div
                    className="fixed inset-0 bg-gray-200 opacity-20 z-40 transition-opacity duration-300"
                    onClick={onClose}>
                </div>
            )}
            <div className={`fixed inset-y-0 left-0 w-80 bg-white shadow-lg transform transition-transform duration-300 z-50
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="flex justify-end p-4">
                </div>
                <div className="p-4">
                    {children}
                </div>
            </div>
        </>
    );
}