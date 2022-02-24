import { Avatar, Divider, List, ListItem, ListItemAvatar, ListItemText } from '@mui/material';
import React from 'react';

const MessagesList = ({ items, onClick }) => {
    return (
        <List sx={{ width: '100%', minWidth: 240, maxHeight: 400 }}>
            {items.map((item, index) => (
                <React.Fragment key={index}>
                    <ListItem alignItems="flex-start" onClick={onClick} sx={{ cursor: 'pointer', '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.05)' } }}>
                        <ListItemAvatar>
                            <Avatar alt={item.name} src={item.img} />
                        </ListItemAvatar>
                        <ListItemText
                            primary={item.name}
                            secondary={item.message}
                        />
                    </ListItem>
                    {index < items.length - 1 && <Divider variant="inset" component="li" />}
                </React.Fragment>
            ))}

        </List>
    );
};

export default MessagesList;
