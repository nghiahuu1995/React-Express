export default function Cars({cars, onDelete, onEdit}) {
    return <div>
        {cars.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Make</th>
                  <th>Model</th>
                  <th>Year</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {cars.map(car => (
                  <tr key={car.id}>
                    <td>{car.id}</td>
                    <td>{car.make}</td>
                    <td>{car.model}</td>
                    <td>{car.year}</td>
                    <td>
                      <button onClick={() => onDelete(car.id)}>Delete</button>
                      <button onClick={() => onEdit(car.id)}>Edit</button>
                    </td>
                    
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No cars available</p>
          )}
    </div>
}