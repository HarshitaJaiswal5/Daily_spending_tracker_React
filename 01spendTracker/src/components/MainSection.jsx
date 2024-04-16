import React, { useState, useEffect } from 'react';
import { TreeTable } from 'primereact/treetable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { SelectButton } from 'primereact/selectbutton';
import { NodeService } from './service/NodeService';


function MainSection() {
  const [nodes, setNodes] = useState([]);
  const [globalFilter, setGlobalFilter] = useState('');
  const [filterMode, setFilterMode] = useState('lenient');
  const [filterOptions] = useState([
    { label: 'Lenient', value: 'lenient' },
    { label: 'Strict', value: 'strict' }
  ]);

  useEffect(() => {
    NodeService.getTreeTableNodes().then((data) => setNodes(data));
  }, []);

  const getHeader = () => {
    return (
      <div className="flex justify-content-end">
        <div className="p-input-icon-left">
          <i className="pi pi-search"></i>
          <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Global Search" />
        </div>
      </div>
    );
  };

  let header = getHeader();

  return (
    <div className="card">
      <div className="flex justify-content-center mb-4">
        <SelectButton value={filterMode} onChange={(e) => setFilterMode(e.value)} options={filterOptions} />
      </div>
      <TreeTable value={nodes} globalFilter={globalFilter} header={header} filterMode={filterMode} tableStyle={{ minWidth: '50rem' }}>
        <Column field="name" header="Name" expander filter filterPlaceholder="Filter by name"></Column>
        <Column field="size" header="Size" filter filterPlaceholder="Filter by size"></Column>
        <Column field="type" header="Type" filter filterPlaceholder="Filter by type"></Column>
      </TreeTable>
    </div>
  )
}

export default mainSection
