import Box from '@mui/material/Box';

const NotFound = () => {
  return (
    // <section className='container'>
    //   <img src="../../public/noSearch.png" alt="dffg"></img>
    // </section>
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <Box
        sx={{
          width: 500,
          height: 500,
          backgroundImage: 'url(../../public/noSearch.png)',          // background
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          // '&:hover': {
          //   backgroundColor: 'primary.main',
          //   opacity: [0.9, 0.8, 0.7],
          // },
        }}
      />
    </div>
  );
};

export default NotFound;
