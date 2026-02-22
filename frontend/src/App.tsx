import { useApiData, useFetchApi } from './api/Provider/ApiContext'
import './App.css'

function App() {
    const apiData = useApiData();
	const fetchApi = useFetchApi();

    return (
		<>
			<div>
				<h2>Use ApiData</h2>
				<p>id: {apiData.id}</p>
				<p>name: {apiData.name}</p>
			</div>
			<div>
				<h2>Use fetchApi</h2>
				<button type="submit" onClick={fetchApi}>Fetch</button>
			</div>
		</>
    )
}

export default App
