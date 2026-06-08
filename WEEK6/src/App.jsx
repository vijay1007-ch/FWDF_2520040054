import { useState } from 'react';
import RegistrationForm from './components/Registration/RegistrationForm';
import LoginForm from './components/Login/LoginForm';

function App() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <>
      {/* Decorative background elements */}
      <div style={{
        position: 'absolute',
        top: '-10%',
        left: '-10%',
        width: '500px',
        height: '500px',
        background: 'radial-gradient(circle, rgba(99,102,241,0.2) 0%, rgba(0,0,0,0) 70%)',
        borderRadius: '50%',
        filter: 'blur(60px)',
        zIndex: 1,
        pointerEvents: 'none'
      }} />
      <div style={{
        position: 'absolute',
        bottom: '-10%',
        right: '-10%',
        width: '600px',
        height: '600px',
        background: 'radial-gradient(circle, rgba(236,72,153,0.15) 0%, rgba(0,0,0,0) 70%)',
        borderRadius: '50%',
        filter: 'blur(60px)',
        zIndex: 1,
        pointerEvents: 'none'
      }} />
      
      {isLogin ? (
        <LoginForm onToggleForm={() => setIsLogin(false)} />
      ) : (
        <RegistrationForm onToggleForm={() => setIsLogin(true)} />
      )}
    </>
  );
}

export default App;
