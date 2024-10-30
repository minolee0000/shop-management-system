function ContactUs() {
    return (
        <div 
            className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-blue-100 p-8"
        >
            <div className="backdrop-blur-sm bg-white bg-opacity-90 p-8 rounded-lg w-full max-w-lg shadow-lg border border-gray-200">
                <h2 className="text-2xl md:text-3xl font-semibold text-center text-blue-700 mb-6">Get in Touch</h2>

                <div className="space-y-6">

                    <div className="p-4 bg-blue-50 rounded-md shadow-sm">
                        <h3 className="text-lg font-medium text-blue-600 text-center mb-2">Our Location</h3>
                        <p className="text-center text-gray-700"> University of Moratuwa</p>
                        <p className="text-center text-gray-700"> Moratuwa, Sri Lanka</p>
                    </div>

                    {/* Contact Information Block */}
                    <div className="p-4 bg-green-50 rounded-md shadow-sm">
                        <h3 className="text-lg font-medium text-green-600 text-center mb-2">Contact Us</h3>
                        <p className="text-center text-gray-700">📞 (+94) 71000000</p>
                        <p className="text-center text-gray-700">📧 minolikumarasinghe0@gmail.com</p>
                    </div>

                    {/* Social Media Links */}
                    <div className="p-4 bg-yellow-50 rounded-md shadow-sm">
                        <h4 className="text-lg font-medium text-yellow-600 text-center mb-2">Follow Us</h4>
                        <div className="flex space-x-4 justify-center">
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 transition-colors">Facebook</a>
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-600 transition-colors">Twitter</a>
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-pink-500 hover:text-pink-700 transition-colors">Instagram</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ContactUs;
