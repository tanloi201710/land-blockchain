import { Avatar, Divider, List, ListItem, ListItemAvatar, ListItemText } from '@mui/material';
import React from 'react';

import adminImg from '../images/admin.png'

const NotifyList = ({ items }) => {
    return (
        <List sx={{ width: '100%', minWidth: 240, maxHeight: 400 }}>
            {items.map((item, index) => (
                <React.Fragment key={index}>
                    <ListItem alignItems="flex-start" >
                        <ListItemAvatar>
                            <Avatar alt={'notification'} src={adminImg} />
                        </ListItemAvatar>
                        <ListItemText
                            primary={item.message}
                            secondary={item.createdAt}
                        />
                    </ListItem>
                    {index < items.length - 1 && <Divider variant="inset" component="li" />}
                </React.Fragment>
            ))}

        </List>
    );
};

export default NotifyList;
