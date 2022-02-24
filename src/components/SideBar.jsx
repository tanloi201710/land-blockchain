import { ArrowForward, Drafts, Help, Info, Phone } from '@mui/icons-material';
import { IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';

const SideBar = ({ effectOut, handleCloseSideBar, showSideBar }) => {
    return (
        <Box
            sx={{
                width: 350,
                height: 270,
                backgroundColor: '#f1f1f1',
                borderRadius: 2,
                padding: 1
            }}
            className={'fade-in'}
        >
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <IconButton color="primary" onClick={handleCloseSideBar} >
                    <ArrowForward />
                </IconButton>

            </div>
            {showSideBar &&
                <List >
                    <ListItem disablePadding sx={{ minWidth: 250 }}>
                        <ListItemButton>
                            <ListItemIcon>
                                <Help color='success' />
                            </ListItemIcon>
                            <ListItemText primary="Câu hỏi thường gặp" />
                        </ListItemButton>
                    </ListItem>

                    <ListItem disablePadding sx={{ minWidth: 250 }} >
                        <ListItemButton>
                            <ListItemIcon>
                                <Drafts color='warning' />
                            </ListItemIcon>
                            <ListItemText primary="Góp ý" />
                        </ListItemButton>
                    </ListItem>

                    <ListItem disablePadding sx={{ minWidth: 250 }} >
                        <ListItemButton>
                            <ListItemIcon>
                                <Info color='action' />
                            </ListItemIcon>
                            <ListItemText primary="Thông tin hệ thống" />
                        </ListItemButton>
                    </ListItem>

                    <ListItem disablePadding sx={{ minWidth: 250 }} >
                        <ListItemButton>
                            <ListItemIcon>
                                <Phone color='info' />
                            </ListItemIcon>
                            <ListItemText primary="Liên hệ" />
                        </ListItemButton>
                    </ListItem>
                </List>
            }
        </Box>
    )
};

export default SideBar;
