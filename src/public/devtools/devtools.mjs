const devtoolsBtn = document.createElement('button');
devtoolsBtn.innerHTML = '<i class="fas fa-wrench"></i>';
Object.assign(devtoolsBtn.style, {
	position: 'fixed',
	bottom: '20px',
	right: '20px',
	zIndex: '9999',
	padding: '10px 15px',
	backgroundColor: '#222',
	color: '#fff',
	border: 'none',
	borderRadius: '5px',
	cursor: 'pointer',
});

const menu = document.createElement('div');
Object.assign(menu.style, {
	position: 'fixed',
	bottom: '74px',
	right: '20px',
	backgroundColor: '#fff',
	borderRadius: '4px',
	padding: '10px',
	border: '1px solid #222',
	boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
	display: 'none',
	zIndex: '9999',
	width: '200px',
});

menu.innerHTML = `
	<ul style="list-style:none; margin:0; padding:0;">
		<li>
			<a class="devtools_link" href="https://alpinejs.dev/" target="_blank">Alpine.js</a>
		</li>
		<li>
			<a class="devtools_link" href="https://fontawesome.com/v5/search?ic=free" target="_blank" ">FontAwesome</a>
		</li>
		<li>
			<a class="devtools_link" href="https://tailwindcss.com/docs/columns" target="_blank" ">TailwindCSS</a>
		</li>
		<li>
			<a class="devtools_link" href="https://v4.daisyui.com/" target="_blank" ">DaisyUI</a>
		</li>
	</ul>
`;

devtoolsBtn.addEventListener('click', () => {
  menu.style.display = menu.style.display === 'none' ? 'block' : 'none';
});

document.body.appendChild(devtoolsBtn);
document.body.appendChild(menu);