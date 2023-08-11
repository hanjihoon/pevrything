import axios from 'axios';

export default function SubscribePage() {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;

    try {
      await axios.post('/api/subscribe', { email });
      alert('Successfully subscribed!');
      e.target.reset();
    } catch (error) {
      alert('Failed to subscribe. Please try again.');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Subscribe to our Newsletter</h1>
      <form onSubmit={handleSubmit} className="flex flex-col md:w-1/2 mx-auto">
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          required
          className="border p-2 mb-2"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Subscribe
        </button>
      </form>
    </div>
  );
}