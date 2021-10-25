

const Table = (props) => {
  return (
    <div className="flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200 text-center">
              <thead className="bg-gray-50">
                <tr>
                  {
                    props.title.map((item, index) => {
                      return (
                        <th scope="col" className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider" key={index} >
                          {item}
                        </th>
                      )
                    })
                  }
                  {
                    props.srOnly ?
                      <th scope="col" className="relative px-6 py-3">
                        <span className="sr-only">Edit</span>
                      </th>
                    :
                      <th className="hidden"></th>
                  }
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {props.children}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

Table.defaulProps = {
  srOnly: true
}

export default Table;