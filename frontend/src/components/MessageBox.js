import Alert from '@mui/material/Alert';

export default function MessageBox(props) {
  return (
    <>
      <Alert severity={props.severity || 'info'}>
        <strong>{props.children}</strong>
      </Alert>
    </>
  );
}
