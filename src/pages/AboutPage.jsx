const AboutPage = () => {
  return (
    <main className="container">
      <div className="auth-card" style={{ maxWidth: '600px', margin: '0 auto' }}>
        <h1>About ELEVO</h1>
        <p>This is a React.js Single Page Application (SPA) developed for the web programming project.</p>
        
        <ul style={{ textAlign: 'left', marginBottom: '20px' }}>
          <li>Responsive Design for Desktop and Mobile.</li>
          <li>Functional Components and React Hooks.</li>
          <li>Dynamic Data Filtering and Sorting.</li>
        </ul>

        <div style={{ marginTop: '20px', borderTop: '1px solid #2d3748', paddingTop: '15px' }}>
          <p><strong>Developed by:</strong></p>
          <p style={{ margin: '5px 0', color: 'var(--primary-blue)' }}>Heba Belal Nashwan</p>
          <p style={{ margin: '5px 0', color: 'var(--primary-blue)' }}>Areen Jamil Subhi Farah</p>
        </div>
      </div>
    </main>
  );
};

export default AboutPage;