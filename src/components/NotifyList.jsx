import { Avatar, Divider, List, ListItem, ListItemAvatar, ListItemText } from '@mui/material';
import React from 'react';

const NotifyList = ({ items }) => {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER
    return (
        <List sx={{ width: '100%', minWidth: 240, maxHeight: 400 }}>
            {items.map((item, index) => (
                <React.Fragment key={index}>
                    <ListItem alignItems="flex-start" >
                        <ListItemAvatar>
                            <Avatar alt={'notification'} src={`${PF}images/admin.png`} />
                        </ListItemAvatar>
                        <ListItemText
                            primary={item.Message}
                            secondary={item.Date}
                        />
                    </ListItem>
                    {index < items.length - 1 && <Divider variant="inset" component="li" />}
                </React.Fragment>
            ))}

        </List>
    );
};

export default NotifyList;
