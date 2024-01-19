import Logo from '../images/writing.png'

function Header() {
  return (
    <header className="mt-4 ml-4 ">
      <div className='inline-block text-center'>
        <img src={Logo} alt="logo" className='w-14 inline'/>
        <h2 className="text-slate-950 text-3xl font-bold">Notes App</h2>
      </div>
    </header>
  );
}

export default Header;