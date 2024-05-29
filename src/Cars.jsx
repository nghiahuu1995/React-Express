import Button from "./Components/Button/Button"
export default function Cars({cars, onDelete, onEdit, selectedID, onCancel}) {
    return <div>
        {cars.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Make</th>
                  <th>Model</th>
                  <th>Year</th>
                  <th className="actions">Actions</th>
                </tr>
              </thead>
              <tbody>
                {cars.map(car => (
                  <tr className={car.id === selectedID ? 'car-selected' : ''}key={car.id}>
                    <td>{car.id}</td>
                    <td>{car.make}</td>
                    <td>{car.model}</td>
                    <td>{car.year}</td>
                    <td className="actions">
                      <Button className="edit-button" fontSize="12px" color="#FFFFFF"bgcolor="#4CAF50" margin="0 2px" width="30%"onClick={() => onEdit(car.id)}>Edit</Button>
                      <Button className="delete-button" fontSize="13px" color="#FFFFFF"bgcolor="#F44336"  margin="0 2px" width="30%"onClick={() => onDelete(car.id)}>Delete</Button>
                      {/* <Button fontSize="12px" bgColor="red" margin="0 2px" width="20%"onClick={() => onCancel()}>Cancel</Button> */}
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