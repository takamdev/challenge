import React, { useState } from 'react';
import { JsonForms } from '@jsonforms/react';
import text from './schema/text.json';
import list from './schema/list.json';
import {
  materialRenderers,
  materialCells,
} from '@jsonforms/material-renderers';


function App() {
  const schema = text.schema;
  const uischema = text.uiSchema;
  const initialData = text.data;
  const [data, setData] = useState(initialData);

//isjnifsjifns
const schemaList = 
  {
    "type": "object",
    "properties": {
      "multiEnum": {
        "type": "array",
        "uniqueItems": true,
        "items": {
          "type": "string",
          "enum": [
            "foo",
            "bar",
            "foobar"
          ]
        }
      }
    }
  }



const uischemaList = {
  "type": "VerticalLayout",
  "elements": [
    {
      "type": "Control",
      "scope": "#/properties/multiEnum"
    }
  ]
}




//soifsf,sf,s


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

<JsonForms
      schema={schemaList}
      uischema={uischemaList}
      data={{
  "multiEnum": [
    "foo",
    "bar"
   
  ]
}}
      renderers={materialRenderers}
      cells={materialCells}
      
    />
      </form>
    
  </div>
  )
}

export default App