import React from "react";

export default function PreparationOptions() {
  return (
    <div className="container mx-auto px-4 py-16">
      {/* Heading */}
      <h1 className="text-5xl font-bold text-black mb-6">Preparation Options</h1>
      <p className="text-lg text-gray-700 mb-12">
        Empower your certification journey with our comprehensive preparation options.
        Choose from expert-led training, and real exam-like mock tests to achieve exam
        success confidently
      </p>

      {/* Two Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Card 1 */}
        <div className="bg-purple-100 rounded-lg shadow-lg p-8">
          <h2 className="text-xl font-bold text-purple-700 mb-4">PMP® Live Training</h2>
          <p className="text-gray-800 font-semibold mb-4">
            Master PMP® with Expert-Led Training & Free Mock Exam Access
          </p>
          <ul className="text-gray-700 list-disc ml-5 mb-8 space-y-2">
            <li>35 contact hours</li>
            <li>40 hrs. of live training</li>
            <li>Recorded videos for revision</li>
            <li>Free Mock Exam Package</li>
            <li>1:1 Personalised support</li>
            <li>Flashcards</li>
            <li>E-book</li>
            <li>Summary books</li>
          </ul>
          <button className="bg-purple-700 hover:bg-purple-800 text-white font-semibold py-2 px-6 rounded">
            Enroll Now
          </button>
        </div>

        {/* Card 2 */}
        <div className="bg-purple-50 rounded-lg shadow-lg p-8">
          <h2 className="text-xl font-bold text-purple-700 mb-4">PMP® Mock Exam</h2>
          <p className="text-gray-800 font-semibold mb-4">
            Ace the PMP® Exam with Realistic Mock Tests
          </p>
          <ul className="text-gray-700 list-disc ml-5 mb-8 space-y-2">
            <li>5 mini mock exams</li>
            <li>5 full length mock exams</li>
            <li>1:1 Personalised support</li>
            <li>Flashcards</li>
            <li>E-book</li>
            <li>Summary books</li>
          </ul>
          <button className="bg-purple-700 hover:bg-purple-200 text-white font-semibold py-2 px-6 rounded">
            Enroll Now
          </button>
        </div>
      </div>
      
    </div>
  );
}