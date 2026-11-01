const app = require('./app');

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`
🎓 ========================================================
   College Placement Assistant AI - Backend Server Active
   Port: http://localhost:${PORT}
   API Health Check: http://localhost:${PORT}/api/health
   Environment: ${process.env.NODE_ENV || 'development'}
======================================================== 🎓
  `);
});
