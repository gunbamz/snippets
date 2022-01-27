import React, {useContext, useState, useCallback, useEffect} from 'react'

const PageContext = React.createContext({})

function Home() {
  const {setPageContext, page} = useContext(PageContext);
  useEffect(() => {
    if (page.title !== 'Home')
      setPageContext({title: 'Home'})
  }, [setPageContext])
  return <p>Hello, World!</p>
}

function App() {
  const {page} = useContext(PageContext)
  return (
    <>
      <h1>Title: {page.title}</h1>
      <Home />
    </>
  )
}

function AppWrapper() {
  const [state, setState] = useState({page: {}})
  const setPageContext = useCallback(
    newState => {
      setState({page: {...state.page, ...newState}})
    },
    [state, setState],
  )
  const getContextValue = useCallback(
    () => ({setPageContext, ...state}),
    [state, updateState],
  )
  return (
    <PageContext.Provider value={getContextValue()}>
      <App />
    </PageContext.Provider>
  )
}