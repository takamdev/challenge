import React, { useState } from 'react';
import { JsonForms } from '@jsonforms/react';

import {
  materialRenderers,
  materialCells,
} from '@jsonforms/material-renderers';
import Select from './components/Select.jsx';


function App() {
  const config = {
    "schema": {
      "type": "object",
      "properties": {
        "nom": {
          "type": "string",
          "minimum": 0,
          "maximum": 5
        }
      },
      "required": [
      "text"
    ]
    },
       "uiSchema": {
        
          "type": "Control",
          "scope": "#/properties/nom"
        
        },
        "data":{
          
            "text": "nom"
          
          }
  }
  const schema =config.schema
  const uischema =config.uiSchema
  const initialData = config.data;
  const [data, setData] = useState(initialData);

  return (
    
    <div className='App'>
      <form>
          <JsonForms 
            schema={schema}
            uischema={uischema}
            data={data}
            renderers={materialRenderers}
            cells={materialCells}
            onChange={({ data }) => setData(data)}
          />
         <Select/>
         
      </form>
    
  </div>
  )
}

export default App