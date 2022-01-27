const WithRouter = WrappedComponent => props => {
  //const params = useParams();
  // etc... other react-router-dom v6 hooks
  const symbol = props.location;
  return (
    <WrappedComponent
      {...props}
      symbol={symbol}
      // etc...
    />
  );
};
export default WithRouter;