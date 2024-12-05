import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CustomerFeedbackApp = () => {
  const [feedbackStage, setFeedbackStage] = useState('initial');
  const [feedbackReason, setFeedbackReason] = useState('');
  const [additionalComments, setAdditionalComments] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const feedbackReasons = [
    { 
      value: 'quality', 
      label: 'Qualità del servizio', 
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        </svg>
      )
    },
    { 
      value: 'price', 
      label: 'Prezzo', 
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" y1="2" x2="12" y2="22"/>
          <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
        </svg>
      )
    },
    { 
      value: 'waiting', 
      label: 'Tempo di attesa', 
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"/>
          <polyline points="12 6 12 12 16 14"/>
        </svg>
      )
    },
    { 
      value: 'other', 
      label: 'Altro', 
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
        </svg>
      )
    },
  ];

  const handlePositiveFeedback = () => {
    window.open('https://g.page/r/CVQEIsA6WpqCEBM/review', '_blank');
  };

  const handleSurveySubmit = async () => {
    setIsSubmitting(true);
    const feedbackData = {
      reason: feedbackReason,
      comments: additionalComments,
      timestamp: new Date().toISOString(),
    };

    try {
      const response = await fetch('https://your-api-domain.com/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(feedbackData),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const responseData = await response.json();
      console.log('Feedback inviato con successo:', responseData);
      setFeedbackStage('thankyou');
    } catch (error) {
      console.error('Errore durante l\'invio del feedback:', error);
      alert('Si è verificato un errore. Riprova più tardi.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderInitialStage = () => (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="bg-white shadow-2xl rounded-2xl p-8 w-[500px] text-center"
    >
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Come è andata?</h2>
      <p className="text-gray-600 mb-8">Il tuo feedback è importante per migliorare il nostro servizio</p>
      <div className="flex justify-center space-x-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-green-500 text-white px-6 py-3 rounded-full"
          onClick={handlePositiveFeedback}
        >
          Esperienza Positiva
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-red-500 text-white px-6 py-3 rounded-full"
          onClick={() => setFeedbackStage('survey')}
        >
          Esperienza Negativa
        </motion.button>
      </div>
    </motion.div>
  );

  const renderSurveyStage = () => (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="bg-white shadow-2xl rounded-2xl p-8 w-[500px]"
    >
      <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">
        Aiutaci a Migliorare
      </h2>
      <div className="space-y-4 mb-8">
        {feedbackReasons.map((reason) => (
          <motion.div
            key={reason.value}
            className={`flex items-center p-4 rounded-lg cursor-pointer 
              ${feedbackReason === reason.value ? 'bg-blue-100 border-2 border-blue-500' : 'bg-gray-100 hover:bg-gray-200'}`}
            onClick={() => setFeedbackReason(reason.value)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {reason.icon}
            <span className="ml-4 text-gray-800 text-lg">{reason.label}</span>
          </motion.div>
        ))}
      </div>
      <textarea
        className="w-full p-4 border-2 rounded-lg mb-6 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        rows={4}
        placeholder="Dettagli aggiuntivi (opzionale)"
        value={additionalComments}
        onChange={(e) => setAdditionalComments(e.target.value)}
      />
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-full bg-blue-600 text-white py-4 rounded-full disabled:opacity-50"
        disabled={!feedbackReason || isSubmitting}
        onClick={handleSurveySubmit}
      >
        {isSubmitting ? 'Invio in corso...' : 'Invia Feedback'}
      </motion.button>
    </motion.div>
  );

  const renderThankYouStage = () => (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="bg-white shadow-2xl rounded-2xl p-8 w-[500px] text-center"
    >
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Grazie!</h2>
      <p className="text-gray-600 mb-8">Il tuo feedback ci aiuterà a migliorare il nostro servizio.</p>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="bg-blue-600 text-white px-6 py-3 rounded-full"
        onClick={() => {
          setFeedbackReason('');
          setAdditionalComments('');
          setFeedbackStage('initial');
        }}
      >
        Chiudi
      </motion.button>
    </motion.div>
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <AnimatePresence mode="wait">
        {feedbackStage === 'initial' && renderInitialStage()}
        {feedbackStage === 'survey' && renderSurveyStage()}
        {feedbackStage === 'thankyou' && renderThankYouStage()}
      </AnimatePresence>
    </div>
  );
};

export default CustomerFeedbackApp;
