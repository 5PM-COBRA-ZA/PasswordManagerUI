import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {Dropdown} from "primereact/dropdown";
import {InputText} from "primereact/inputtext";
import {Paginator} from "primereact/paginator";
import './page.css';
import {Button} from "primereact/button";
import PasswordForm from "./form.tsx";

const PasswordsPage = () => {

    const items = [
        {website: 'http://localhost:80', username: 'username', password: 'password'},
        {website: 'http://localhost:80', username: 'username', password: 'password'},
        {website: 'http://localhost:80', username: 'username', password: 'password'},
        {website: 'http://localhost:80', username: 'username', password: 'password'},
        {website: 'http://localhost:80', username: 'username', password: 'password'},
        {website: 'http://localhost:80', username: 'username', password: 'password'},
        {website: 'http://localhost:80', username: 'username', password: 'password'},
        {website: 'http://localhost:80', username: 'username', password: 'password'},
        {website: 'http://localhost:80', username: 'username', password: 'password'},
        {website: 'http://localhost:80', username: 'username', password: 'password'},
        {website: 'http://localhost:80', username: 'username', password: 'password'},
        {website: 'http://localhost:80', username: 'username', password: 'password'},
        {website: 'http://localhost:80', username: 'username', password: 'password'},
        {website: 'http://localhost:80', username: 'username', password: 'password'},
        {website: 'http://localhost:80', username: 'username', password: 'password'},
    ]

    return(
        <>
            <div className={'p-3 flex justify-content-between align-items-center filter'} style={{background: 'var(--surface-card)', border: 'var(--surface-border)'}}>
                <div className={'flex gap-3'}>
                    <Button
                        icon="pi pi-plus"
                        outlined
                    />
                    <InputText
                        placeholder="Search"
                    />
                </div>
                <div>
                    <Dropdown
                        options={[]}
                        optionLabel="name"
                        showClear
                        placeholder="Group by"
                        className="w-full md:w-14rem"
                    />
                </div>
            </div>

            <DataTable
                id={'sticky-header-table'}
                pt={{wrapper: {style: {overflow: 'visible'}}}}
                value={items}
            >
                <Column sortable headerStyle={{width: '33.34%'}} field="website" header="Website"></Column>
                <Column sortable headerStyle={{width: '33.33%'}} field="username" header="Username"></Column>
                <Column headerStyle={{width: '33.33%'}} field="password" header="Password"></Column>
            </DataTable>

            <div className={'p-3 border-table-cell text-center pagination'} style={{background: 'var(--surface-card)', border: 'var(--surface-border)'}}>
                <Paginator
                    first={50}
                    rows={10}
                    totalRecords={120}
                    pageLinkSize={3}
                    className={'p-0'}
                />
            </div>

            <PasswordForm
                on_close={() => {}}
            />
        </>
    );
};

export default PasswordsPage;