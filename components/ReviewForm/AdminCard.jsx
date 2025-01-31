export default function AdminCard({ id, firstname, lastname, star, title, review }) {
    return (
      <div className="bg-white p-4 rounded-lg shadow-md">
        <div className="flex justify-between items-start mb-2">
          <h2 className="font-bold text-lg">ID:{id}</h2>
          <h3 className="font-bold text-lg">{title}</h3>
          <div className="flex items-center">
            <span className="text-yellow-400">★</span>
            <span className="ml-1">{star}</span>
          </div>
        </div>
        <p className="text-gray-600 mb-4">{review}</p>
        <p className="text-sm text-gray-500">
          By {firstname} {lastname}
        </p>
      </div>
    )
  }