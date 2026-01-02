import React, { useState } from 'react';
import axios from 'axios';

const CreateTripForm = () => {
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem('token');

  // Basic fields
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [basePrice, setBasePrice] = useState('');
  const [duration, setDuration] = useState('');
  const [numberOfGuests, setNumberOfGuests] = useState('');
  const [startDate, setStartDate] = useState('');

  // Overview object
  const [overview, setOverview] = useState({
    duration: '',
    groupSize: '',
    language: '',
    difficulty: ''
  });

  // Arrays
  const [whatIncluded, setWhatIncluded] = useState(['']);
  const [itinerary, setItinerary] = useState([
    { day: 1, title: '', description: '', activities: [''] }
  ]);

  // Images (files)
  const [images, setImages] = useState([]);

  // Handle overview changes
  const handleOverviewChange = (field, value) => {
    setOverview(prev => ({ ...prev, [field]: value }));
  };

  // Handle whatIncluded
  const addIncludedItem = () => {
    setWhatIncluded([...whatIncluded, '']);
  };

  const updateIncludedItem = (index, value) => {
    const updated = [...whatIncluded];
    updated[index] = value;
    setWhatIncluded(updated);
  };

  const removeIncludedItem = (index) => {
    setWhatIncluded(whatIncluded.filter((_, i) => i !== index));
  };

  // Handle itinerary
  const addItineraryDay = () => {
    setItinerary([
      ...itinerary,
      { day: itinerary.length + 1, title: '', description: '', activities: [''] }
    ]);
  };

  const updateItineraryDay = (index, field, value) => {
    const updated = [...itinerary];
    updated[index][field] = value;
    setItinerary(updated);
  };

  const addActivity = (dayIndex) => {
    const updated = [...itinerary];
    updated[dayIndex].activities.push('');
    setItinerary(updated);
  };

  const updateActivity = (dayIndex, activityIndex, value) => {
    const updated = [...itinerary];
    updated[dayIndex].activities[activityIndex] = value;
    setItinerary(updated);
  };

  const removeActivity = (dayIndex, activityIndex) => {
    const updated = [...itinerary];
    updated[dayIndex].activities = updated[dayIndex].activities.filter(
      (_, i) => i !== activityIndex
    );
    setItinerary(updated);
  };

  const removeItineraryDay = (index) => {
    setItinerary(itinerary.filter((_, i) => i !== index));
  };

  // Handle images
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Create FormData object
      const formData = new FormData();

      // Add basic fields
      formData.append('title', title);
      formData.append('description', description);
      formData.append('location', location);
      formData.append('basePrice', basePrice);
      formData.append('duration', duration);
      formData.append('numberOfGuests', numberOfGuests);
      formData.append('startDate', startDate);

      // Add overview as JSON string
      formData.append('overview', JSON.stringify(overview));

      // Add whatIncluded as JSON string
      formData.append('whatIncluded', JSON.stringify(whatIncluded.filter(item => item.trim() !== '')));

      // Add itinerary as JSON string
      const cleanItinerary = itinerary.map(day => ({
        ...day,
        activities: day.activities.filter(activity => activity.trim() !== '')
      }));
      formData.append('itinerary', JSON.stringify(cleanItinerary));

      // Add images
      images.forEach((image) => {
        formData.append('images', image);
      });

      // Send to backend
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v2/trips/create`,
        formData,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      console.log('Trip created:', response.data);
      alert('Trip created successfully!');

      // Reset form (optional)
      // resetForm();

    } catch (error) {
      console.error('Error creating trip:', error);
      alert(error.response?.data?.message || 'Failed to create trip');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold mb-6">Create New Trip</h1>

      {/* Basic Information */}
      <div className="bg-white p-6 rounded-lg shadow space-y-4">
        <h2 className="text-xl font-semibold">Basic Information</h2>

        <div>
          <label className="block text-sm font-medium mb-2">Title *</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
            placeholder="Trip to Paris"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Description *</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            rows="4"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
            placeholder="Explore the city of lights..."
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Location *</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
              placeholder="Paris"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Base Price *</label>
            <input
              type="number"
              value={basePrice}
              onChange={(e) => setBasePrice(e.target.value)}
              required
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
              placeholder="1200"
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Duration (days) *</label>
            <input
              type="number"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              required
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
              placeholder="5"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Max Guests *</label>
            <input
              type="number"
              value={numberOfGuests}
              onChange={(e) => setNumberOfGuests(e.target.value)}
              required
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
              placeholder="20"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Start Date *</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              required
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Overview */}
      <div className="bg-white p-6 rounded-lg shadow space-y-4">
        <h2 className="text-xl font-semibold">Overview</h2>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Duration</label>
            <input
              type="text"
              value={overview.duration}
              onChange={(e) => handleOverviewChange('duration', e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
              placeholder="5 days"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Group Size</label>
            <input
              type="text"
              value={overview.groupSize}
              onChange={(e) => handleOverviewChange('groupSize', e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
              placeholder="Max 12 people"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Language</label>
            <input
              type="text"
              value={overview.language}
              onChange={(e) => handleOverviewChange('language', e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
              placeholder="English"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Difficulty</label>
            <select
              value={overview.difficulty}
              onChange={(e) => handleOverviewChange('difficulty', e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
            >
              <option value="">Select difficulty</option>
              <option value="Easy">Easy</option>
              <option value="Moderate">Moderate</option>
              <option value="Hard">Hard</option>
            </select>
          </div>
        </div>
      </div>

      {/* What's Included */}
      <div className="bg-white p-6 rounded-lg shadow space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">What's Included</h2>
          <button
            type="button"
            onClick={addIncludedItem}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            + Add Item
          </button>
        </div>

        {whatIncluded.map((item, index) => (
          <div key={index} className="flex gap-2">
            <input
              type="text"
              value={item}
              onChange={(e) => updateIncludedItem(index, e.target.value)}
              className="flex-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
              placeholder="e.g., Daily breakfast"
            />
            {whatIncluded.length > 1 && (
              <button
                type="button"
                onClick={() => removeIncludedItem(index)}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Remove
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Itinerary */}
      <div className="bg-white p-6 rounded-lg shadow space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Itinerary</h2>
          <button
            type="button"
            onClick={addItineraryDay}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            + Add Day
          </button>
        </div>

        {itinerary.map((day, dayIndex) => (
          <div key={dayIndex} className="border border-gray-200 rounded p-4 space-y-3">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold">Day {day.day}</h3>
              {itinerary.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeItineraryDay(dayIndex)}
                  className="text-red-500 text-sm hover:underline"
                >
                  Remove Day
                </button>
              )}
            </div>

            <input
              type="text"
              value={day.title}
              onChange={(e) => updateItineraryDay(dayIndex, 'title', e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
              placeholder="Day title"
            />

            <textarea
              value={day.description}
              onChange={(e) => updateItineraryDay(dayIndex, 'description', e.target.value)}
              rows="2"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
              placeholder="Day description"
            />

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium">Activities</label>
                <button
                  type="button"
                  onClick={() => addActivity(dayIndex)}
                  className="text-blue-500 text-sm hover:underline"
                >
                  + Add Activity
                </button>
              </div>

              {day.activities.map((activity, activityIndex) => (
                <div key={activityIndex} className="flex gap-2">
                  <input
                    type="text"
                    value={activity}
                    onChange={(e) => updateActivity(dayIndex, activityIndex, e.target.value)}
                    className="flex-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                    placeholder="Activity description"
                  />
                  {day.activities.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeActivity(dayIndex, activityIndex)}
                      className="text-red-500 text-sm"
                    >
                      ×
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Images */}
      <div className="bg-white p-6 rounded-lg shadow space-y-4">
        <h2 className="text-xl font-semibold">Images *</h2>
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleImageChange}
          required
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
        {images.length > 0 && (
          <p className="text-sm text-gray-600">{images.length} image(s) selected</p>
        )}
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 disabled:bg-gray-400 font-semibold text-lg"
      >
        {loading ? 'Creating Trip...' : 'Create Trip'}
      </button>
    </form>
  );
};

export default CreateTripForm;