// import ReactDOM from 'react-dom'
import { forwardRef } from 'react';
import "./Content.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";
import MaterialTable, { MTableBodyRow } from "material-table";
import ContextMenu from "./ContextMenu"
// import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";

import AddBox from '@material-ui/icons/AddBox';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import MoreVert from '@material-ui/icons/MoreVert';

import PlayArrow from '@material-ui/icons/PlayArrow'
import Queue from '@material-ui/icons/Queue';

import { Icons } from 'material-table';

const tableIcons: Icons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowUpward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};

interface Element {

}

function Content(props: any): JSX.Element {

    const song_columns = [
        { title: "Title", field: "title" },
        { title: "Length", field: "length", editable: "never" as const },
        { title: "Artist", field: "artist" },
        { title: "Album", field: "album" }
    ]

    var example_songs = [
        {
            id: 0,
            title: "Apple",
            length: "3:23",
            artist: "Test artist 1",
            album: "Test album 1",
            album_tr_no: 0,
            date_added: "13-5-2021",
            genre: "Pop",
            uid: "uid_one"
        },
        {
            id: 1,
            title: "Banana",
            length: "9:30",
            artist: "Test artist 1",
            album: "Test album 1",
            album_tr_no: 1,
            date_added: "14-5-2021",
            genre: "Rock",
            uid: "uid_two"
        },
        {
            id: 2,
            title: "Cat",
            length: "5:20",
            artist: "Test artist 1",
            album: "Test album 1",
            album_tr_no: 2,
            date_added: "15-5-2021",
            genre: "Jazz",
            uid: "uid_three"
        },
        {
            id: 3,
            title: "Donkey",
            length: "1:47",
            artist: "Test artist 2",
            album: "Test album 2",
            album_tr_no: 0,
            date_added: "16-5-2021",
            genre: "Pop",
            uid: "uid_four"
        },
        {
            id: 4,
            title: "Fish",
            length: "2:43",
            artist: "Test artist 2",
            album: "Test album 2",
            album_tr_no: 1,
            date_added: "16-5-2021",
            genre: "Jazz",
            uid: "uid_five"
        },
    ]

    function test_callback(uid:any) {
        console.log(contextMenuActive)
        console.log(uid)
    }

    var contextMenuItems = [
        {
            icon: <PlayArrow style={{color:"black"}}/>,
            label: "Play",
            uid: "play",
            callback: test_callback
        },
        {
            icon: <Queue style={{color:"black"}} />,
            label: "Add to queue",
            uid: "addtoq",
            callback: test_callback
        },
    ]

    const [topBarSelection, setTopBar] = useState(0);
    const [songsTableData, setSongsTableData] = useState(example_songs);
    const [contextMenuVisible, setContextMenuVisible] = useState(false);
    const [contextMenuX, setContextMenuX] = useState("0");
    const [contextMenuY, setContextMenuY] = useState("0");
    const [contextMenuActive, setContextMenuActive] = useState(null);

    return (
        <div className="container-fluid mainapp-content-container" style={{ color: "#ffffff" }}>
            <div className="row content-top-bar col-12">
                {/* Only show when screen size is small */}
                <div className="d-sm-block d-md-none col-sm-2 col-12">
                    <div style={{ padding: "10px", cursor: "pointer" }} onClick={() => props.setNavBar(!props.navBarState)}>
                        <FontAwesomeIcon icon="align-justify" />
                    </div>
                </div>
                <div className="col-sm-8 col-md-10 col-12">
                    <div className={topBarSelection === 1 ? "content-top-bar-items-container selected" : "content-top-bar-items-container"} onClick={() => { setTopBar(1); }}>All songs</div>
                    <div className={topBarSelection === 2 ? "content-top-bar-items-container selected" : "content-top-bar-items-container"} onClick={() => { setTopBar(2); }}>Artists</div>
                    <div className={topBarSelection === 3 ? "content-top-bar-items-container selected" : "content-top-bar-items-container"} onClick={() => { setTopBar(3); }}>Albums</div>
                    <div className={topBarSelection === 4 ? "content-top-bar-items-container selected" : "content-top-bar-items-container"} onClick={() => { setTopBar(4); }}>Genres</div>
                </div>
                <ContextMenu x={contextMenuX} y={contextMenuY} visible={contextMenuVisible} items={contextMenuItems}/>
                <div className="songs-section" style={{ display: 'flex', flexDirection: 'column', }} onClick={() => setContextMenuVisible(false)}>
                    <MaterialTable
                        icons={tableIcons}
                        columns={song_columns}
                        data={songsTableData}
                        title="Songs"
                        actions={[
                            {
                                icon: MoreVert,
                                tooltip: 'More Options',
                                onClick: (event, rowData) => {

                                    if (contextMenuActive != (rowData as any).uid) {
                                        //TODO: get location of button and use it for xy
                                        setContextMenuVisible(true)
                                        setContextMenuX(event.pageX)
                                        setContextMenuY(event.pageY)
                                        setContextMenuActive((rowData as any).uid)
                                    }

                                    else if (contextMenuActive === (rowData as any).uid) {
                                        setContextMenuVisible(!contextMenuVisible)
                                    }
                                }
                            }
                        ]}
                        options={{
                            actionsColumnIndex: -1
                        }}
                    />
                </div>
            </div>
        </div>
    );
}
export default Content;
