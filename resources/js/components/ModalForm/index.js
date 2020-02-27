import React, { useEffect }  from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles(theme => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
    root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

 const ModalForm = ({ title, children, openStatus=false, setOpenModalStatus}) => {
     const classes = useStyles();
     const [modalStyle] = React.useState(getModalStyle);
     const [open, setOpen] = React.useState(openStatus);

      const handleClose = () => {
        setOpenModalStatus('false')
      };
     useEffect(() => {
         setOpen(openStatus);
     }, [openStatus])

  return (
    <div>
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        onClose={()=>{setOpenModalStatus(false)}}
      >
        <div style={modalStyle} className={classes.paper}>
          <h2 id="simple-modal-title">{title}</h2>
            {children}
        </div>
      </Modal>
    </div>
  );
};
export default ModalForm;







