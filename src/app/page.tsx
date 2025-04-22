import { AuthForm } from "@/components/AuthForm";


export default function Home() {
	return (
		<div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
			<h1 className="text-4xl font-bold text-gray-800 p-8">Welcome to Fotober</h1>
			{/* <a href="/about" className="mt-6 px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600">
				Go to About Page
			</a> */}
			<AuthForm />
		</div>
	);
}