import React from 'react';

const Footer = () => {
	return (
		<footer className='page-footer font-small bg-dark pb-5'>
			<div className='container'>
				<div className='pt-5'>
					<div className='mb-5 text-center'>
						<a href='https://twitter.com/codevmap/'>
							<i className='fab fa-twitter white-text mx-3 fa-2x'> </i>
						</a>

						<a href='https://www.instagram.com/codevmap/'>
							<i className='fab fa-instagram white-text mx-3 fa-2x'> </i>
						</a>
					</div>
				</div>
				<div className='text-center text-white'>© 2020 Copyright</div>
			</div>
		</footer>
	);
};

export default Footer;
