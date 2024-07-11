import { AttachmentIcon, ExternalLinkIcon } from '@chakra-ui/icons'
import { IconButton, Input, Menu, MenuButton, MenuItem, MenuList, Toast } from '@chakra-ui/react'
import React, { useRef, useState } from 'react'
import FileModal from '../FileModal/FileModal'

const File = ({handleSendFile}) => {

    const [openModal,setOpenModal]= useState(false)
    const [files,setFiles]=useState(null)
    const FileRef = useRef(null);
    const ImageRef = useRef(null);
    const AudioRef = useRef(null);
    const VideoRef = useRef(null);

    const selectFile = () => FileRef?.current.click();
    const selectImage = () => ImageRef?.current.click();
    const selectAudio = () => AudioRef?.current.click();
    const selectVideo = () => VideoRef?.current.click();


    const fileHandler = (e, key) => {
        console.log(e.target.files)
        const selectedfiles = Array.from(e.target.files)
        console.log(selectedfiles);

        if (selectedfiles.length < 0) return

        if (selectedfiles.length > 4) {
            alert(`you can only send 4 ${key} at a time`)
        }
        setFiles(selectedfiles)
        console.log("yaha hu ma",!openModal);
        setOpenModal(true)
    }

    return (
        <>
         {openModal?<FileModal
            openModal={openModal}
            setOpenModal={setOpenModal}
            selectedfiles={files}
            handleSendFile={handleSendFile}
         />
         :
         "no files selected"}
            <Menu>
                <MenuButton
                    as={IconButton}
                    aria-label='Options'
                    icon={<AttachmentIcon />}
                    variant='outline'
                />
                <MenuList>
                    <MenuItem onClick={selectFile} icon={<ExternalLinkIcon />} >
                        Document
                        <Input ref={FileRef} type="file" multiple accept="*" display="none"
                            onChange={(e) => fileHandler(e, "Document")}
                        />
                    </MenuItem>
                    <MenuItem onClick={selectImage} icon={<ExternalLinkIcon />} >
                        Image
                        <Input ref={ImageRef} type="file" multiple accept="image/png, image/jpeg, image/gif" display="none"
                            onChange={(e) => fileHandler(e, "Image")}
                        />
                    </MenuItem>
                    <MenuItem onClick={selectAudio} icon={<ExternalLinkIcon />} >
                        Audio
                        <Input ref={AudioRef} type="file" multiple accept="audio/mpeg, audio/wav" display="none"
                            onChange={(e) => fileHandler(e, "Audio")}
                        />
                    </MenuItem>
                    <MenuItem onClick={selectVideo} icon={<ExternalLinkIcon />} >
                        Video
                        <Input ref={VideoRef} type="file" multiple accept="video/mp4, video/webm, video/ogg" display="none"
                            onChange={(e) => fileHandler(e, "Video")}
                        />
                    </MenuItem>

                </MenuList>
            </Menu>
        </>

    )
}

export default File