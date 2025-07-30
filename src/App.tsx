import viteLogo from '/vite.svg'
import './App.css'

function App() {

  return (
    <div className={'creds-card'}>
        <div className={'creds-logo'}>
            <a href="https://vite.dev" target="_blank">
              <img height={75} src={viteLogo} className="logo" alt="Vite logo" />
            </a>
        </div>
        <div>
            <h1>Login</h1>
        </div>
        <div className={'field'}>
            <label>Email</label>
            <input />
        </div>
        <div className={'field'}>
            <label>Password</label>
            <input type='password' />
        </div>

        <button>Login</button>
    </div>
  )
}

export default App
