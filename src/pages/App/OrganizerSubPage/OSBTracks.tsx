import EditTrackModal from "../../../components/MainApp/OrganizerSubComponent/EditTrackModal";
import React, { useState, useEffect } from "react";
import OSBTracksMTable from "./OSBTracksMTable";
import { GenericProps } from "../../../interface/GenericProps";

const OSBTracks = (props: GenericProps) => {
    const [showEditModalBox, setShowEditModalBox] = useState(false);
    const [editModalRowData, seteditModalRowData] = useState({});
    const [t_data, set_t_data] = useState([]);
    const [passedData, setPassedData] = useState({});

    useEffect(() => {
        if (props.API_DATA.indexesLoading || props.API_DATA.folderLoading) {
            return;
        }
        if (props.API_DATA.indexesError || props.API_DATA.folderError) {
            alert("Something went wrong, please try again later");
            return;
        }
        let files_response = props.API_DATA.indexesData;
        let scan_folder_response = props.API_DATA.folderData;
        // set_tdata(files_response.data);
        let keys = Object.keys(files_response.files);
        let t_data: any = [];
        for (let i = 0; i < keys.length; i++) {
            let file_item = files_response.files[keys[i]];
            let parent_path = "/";
            if (file_item.parents !== undefined) {
                while (file_item.parents.length !== 0) {
                    let parent_id = file_item.parents.pop();
                    if (scan_folder_response[parent_id] !== undefined) {
                        parent_path +=
                            scan_folder_response[parent_id].folder_name + "/";
                    }
                }
            }
            t_data.push({
                file_id: keys[i],
                rowNum: i + 1,
                driveLocation: parent_path,
                fileName: file_item.filename,
                trackTitle:
                    file_item.file_metadata.song_title === undefined
                        ? "-"
                        : file_item.file_metadata.song_title,
                trackArtist:
                    file_item.file_metadata.song_artistid === undefined
                        ? "-"
                        : file_item.file_metadata.song_artistid,
                trackAlbumTrNo:
                    file_item.file_metadata.album_track_no === undefined
                        ? "-"
                        : file_item.file_metadata.album_track_no,
                trackAlbum:
                    file_item.file_metadata.song_albumid === undefined
                        ? "-"
                        : file_item.file_metadata.song_albumid,
                trackGenre:
                    file_item.file_metadata.song_genreid === undefined
                        ? "-"
                        : file_item.file_metadata.song_genreid,
            });
        }

        let artistLookUpObject: any = { "-": "-" };
        let artistIds = Object.keys(props.API_DATA.indexesData.artists);
        for (let i = 0; i < artistIds.length; i++) {
            artistLookUpObject[artistIds[i]] =
                props.API_DATA.indexesData.artists[artistIds[i]].artist_name;
        }

        let albumLookUpObject: any = { "-": "-" };
        let albumIds = Object.keys(props.API_DATA.indexesData.albums);
        for (let i = 0; i < albumIds.length; i++) {
            albumLookUpObject[albumIds[i]] =
                props.API_DATA.indexesData.albums[albumIds[i]].album_name;
        }

        let genreLookUpObject: any = { "-": "-" };
        let genreIds = Object.keys(props.API_DATA.indexesData.genres);
        for (let i = 0; i < genreIds.length; i++) {
            genreLookUpObject[genreIds[i]] =
                props.API_DATA.indexesData.genres[genreIds[i]].genre_name;
        }

        let playlistLookUpObject: any = { "-": "-" };
        let playlistIds = Object.keys(props.API_DATA.indexesData.playlists);
        for (let i = 0; i < playlistIds.length; i++) {
            playlistLookUpObject[playlistIds[i]] =
                props.API_DATA.indexesData.playlists[
                    playlistIds[i]
                ].playlist_name;
        }

        const passedDataInner = {
            artistLookUpObject,
            albumLookUpObject,
            genreLookUpObject,
            playlistLookUpObject,
            t_data,
            setShowEditModalBox,
            seteditModalRowData,
        };
        if (Object.keys(passedData).length === 0) {
            setPassedData(passedDataInner);
            set_t_data(t_data);
        }
    }, [
        passedData,
        props.API_DATA,
        props.API_DATA.indexesLoading,
        props.API_DATA.folderLoading,
    ]);

    return props.API_DATA.indexesLoading || props.API_DATA.folderLoading ? (
        <div>Loading...</div>
    ) : (
        <div
            style={{ maxWidth: "100%" }}
            className={props.className === undefined ? "" : props.className}
        >
            <div>
                <button
                    onClick={() => {
                        props.API_DATA.indexesRefetch();
                    }}
                >
                    Refresh
                </button>
                <EditTrackModal
                    row_data={editModalRowData}
                    show={showEditModalBox}
                    setShow={setShowEditModalBox}
                    passedData={passedData}
                    t_data={t_data}
                    set_t_data={set_t_data}
                />
                {Object.keys(passedData).length === 0 ? (
                    <div></div>
                ) : (
                    <OSBTracksMTable passedData={passedData} t_data={t_data} />
                )}
            </div>
        </div>
    );
};

export default React.memo(OSBTracks);
