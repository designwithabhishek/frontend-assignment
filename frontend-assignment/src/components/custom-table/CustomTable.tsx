import "./custom-table.css"

type tableProps<T> = {
    data: T[];
    columns: ReadonlyArray<keyof T>;
  };
  
  const CustomTable = <T extends Record<string, any>>({ data, columns }: tableProps<T>) => {
    return (
      <table border={1}>
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column as string}>{column as string}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((column) => (
                <td key={column as string}>{row[column]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  };
  
  export default CustomTable;
  