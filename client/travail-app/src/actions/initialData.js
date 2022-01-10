export const initialData = {
    boardss: [
        {
            id: 'board-1',
            columnOrder: ['column-3', 'column-1', 'column-2'],
            columns: [
                {
                    id: 'column-1',
                    boardId: 'board-1',
                    title: ' To do column',
                    cardOrder: ['card-9', 'card-2', 'card-3', 'card-4', 'card-5', 'card-6', 'card-7', 'card-8', 'card-1'],
                    cards: [
                        {
                            id: 'card-1',
                            boardId: 'board-1',
                            columnId: 'column-1',
                            title: 'Title of card 1',
                            cover: "https://quangduc.com/images/file/aT7nHPOU0AgBAB8b/cat-07.jpg"
                        },
                        {id: 'card-2', boardId: 'board-1', columnId: 'column-1', title: 'Title of card 2',  cover: null},
                        {id: 'card-3', boardId: 'board-1', columnId: 'column-1', title: 'Title of card 3',  cover: null},
                        {id: 'card-4', boardId: 'board-1', columnId: 'column-1', title: 'Title of card 4',  cover: null},
                        {id: 'card-5', boardId: 'board-1', columnId: 'column-1', title: 'Title of card 5',  cover: null},
                        {id: 'card-6', boardId: 'board-1', columnId: 'column-1', title: 'Title of card 6',  cover: null},
                        {id: 'card-7', boardId: 'board-1', columnId: 'column-1', title: 'Title of card 7',  cover: null},
                        {id: 'card-8', boardId: 'board-1', columnId: 'column-1', title: 'Title of card 8',  cover: null},
                        {id: 'card-9', boardId: 'board-1', columnId: 'column-1', title: 'Title of card 9',  cover: null},    
                        
                    ]
                },
                {
                    id: 'column-2',
                    boardId: 'board-1',
                    title: ' Inprogress column',
                    cardOrder: ['card-10', 'card-11', 'card-12', 'card-13', 'card-14'],
                    cards: [
                       
                        {id: 'card-10', boardId: 'board-1', columnId: 'column-1', title: 'Title of card 10',  cover: null},
                        {id: 'card-11', boardId: 'board-1', columnId: 'column-1', title: 'Title of card 11',  cover: null},
                        {id: 'card-12', boardId: 'board-1', columnId: 'column-1', title: 'Title of card 12',  cover: null},
                        {id: 'card-13', boardId: 'board-1', columnId: 'column-1', title: 'Title of card 13',  cover: null},
                        {id: 'card-14', boardId: 'board-1', columnId: 'column-1', title: 'Title of card 14',  cover: null},
                            
                        
                    ]
                },
                {
                    id: 'column-3',
                    boardId: 'board-1',
                    title: ' Done column',
                    cardOrder: ['card-15', 'card-16', 'card-17'],
                    cards: [
                      
                        {id: 'card-15', boardId: 'board-1', columnId: 'column-1', title: 'Title of card 15',  cover: null},
                        {id: 'card-16', boardId: 'board-1', columnId: 'column-1', title: 'Title of card 16',  cover: null},
                        {id: 'card-17', boardId: 'board-1', columnId: 'column-1', title: 'Title of card 17',  cover: null},
                       
                    ]
                },
            ]
        }
    ]
       
        
    
}