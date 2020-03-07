const r = require('rethinkdb');

const fetchByID = (db, table, id) => {
    return new Promise ((resolve, reject) => {
        r.table(table).get(id).run(db, (err, result) => {
            if (!err) {
                if (!result) reject('failed at fetch by ID')
                else resolve(result)
            } else reject(err)
        });
    })
}

const insertDoc = (db, table, data, id = null) => {
    return new Promise ((resolve, reject) => {
        const newData = {...data}
        if (id !== null){
            newData.id = String(id);
        }
        r.table(table).insert(newData).run(db, (err, result) => {
            if (!err)
                resolve(true)
            else 
                reject(false)
        })
    })
}

const fetchAll = (db, table) => {
    return new Promise ((resolve, reject) => {
        r.table(table).run(db, (err, cursor) => {
            if (err) throw err;
            cursor.toArray((err,result) => {
                if (err) reject(err);
                else resolve(result)
            })
        })
    })     
}

const getChatMessages = (db, sender, receiver) => {
        return new Promise ((resolve, reject) => {
        const DocName = String(BigInt(sender)*BigInt(receiver));
        r.table('chatlogs').get(DocName).run(db, (err, result) => {
            if (!err) {
                if (!result) reject(null)
                else resolve(result)
            } else reject(err)
        })
    })
}

const updateDocByID = (db, table, id, body) => {
    return new Promise ((resolve, reject) => {
        r.table(table).get(id).update(body).run(db, (err, result) => {
            if (!err) {
                if (result.skipped==0){   
                    resolve('done')
                } else {
                    reject('failed')
                }
            } else reject(err)

        })
    })
}

//below function can be a bit faster ::: not critical to make faster
const insertChatMessage = (db, sender, receiver, message, time) => {
    return new Promise ((resolve, reject) => {
        const DocName = String(BigInt(sender)*BigInt(receiver));
        r.table('chatlogs').get(DocName).run(db, (err, originalData) => {
            if (!err) {
                let data = null
                if (originalData != null){
                    data = {
                        [time]: {
                            message,
                            from: sender,
                            time,
                            seen: false 
                        }
                    }
                } else {
                    data = {
                        participants: [String(sender), String(receiver)],
                        lastChatTimeStamp: time,
                        [time]: {
                            message,
                            from: sender,
                            time,
                            seen: false 
                        }
                    }
                }
                updateDocByID(db,'chatlogs',DocName,data)
                .then(x => {
                    updateRecentArray(db, String(sender), String(receiver))
                    updateRecentArray(db, String(receiver), String(sender))
                    resolve(x)
                })
                .catch(x => {
                    insertDoc(db,'chatlogs', data, DocName)
                    .then(x => {
                        updateRecentArray(db, String(sender), String(receiver))
                        updateRecentArray(db, String(receiver), String(sender))
                        resolve(x)
                    })
                    .catch(x=>reject(x))
                })
            } else reject('failed')
        });
    })
}

const updateRecentArray = (db, num1, num2) => {
    fetchByID(db,'users',num1).then(data => {
        let newArray = data.recent;
        if (data.recent.includes(String(num2))){
            newArray = newArray.filter(x => String(x) != String(num2))  
        }
        newArray.unshift(String(num2));
        updateDocByID(db,'users',num1,{recent: newArray}).catch(x => {
            //log error
        });
    }).catch(x => {
        //log error
    })
}

const setMessageSeen = (db,participants,id) => {
    return new Promise ((resolve, reject) => {
        const DocName = String(BigInt(participants[0])*BigInt(participants[1]));
        fetchByID(db,'chatlogs',DocName)
        .then(x => {
            updateDocByID(db,'chatlogs',DocName,{
                [String(id)]: {
                    ...x[String(id)],
                    seen: true
                }
            }).then(x => {
                
                resolve(x)
            })
            .catch(x => reject(x))
        }).catch(x => reject(x))
    })
}

const stepNotifications = (db,receiver,sender,reset=true) => {
    fetchByID(db, 'users', String(receiver))
    .then(x => {
        if (reset === true) {
            updateDocByID(db, 'users', receiver, {notifications: {...x.notifications, [sender]: 0}})
        } else {
            let curNum = 0;
            if (x.notifications!== undefined && x.notifications[sender] !== undefined){
                curNum = x.notifications[sender];
            }
            updateDocByID(db, 'users', receiver, {notifications: {...x.notifications, [sender]: curNum + 1}})
        }
    }).catch(x => {
        console.log(x)
        //log error
    })
}

const ArrayUserToggle = (db, id, number, arrayName) => {
    return new Promise((resolve, reject) => {
        fetchByID(db, 'users',String(id))
        .then(data => {
            let newArray = data[arrayName];
            if (data[arrayName].includes(String(number))){
                newArray = newArray.filter(x => String(x) != String(number))
            } else {
                newArray.push(String(number));
            }
            updateDocByID(db, 'users', String(id), {[arrayName]: newArray})
            .then(x => resolve(newArray))
            .catch(x => reject('failed'))
        })
        .catch(x => reject(false))
    })
}

module.exports = {
    fetchByID,
    insertDoc,
    updateDocByID,
    fetchAll,
    insertChatMessage,
    getChatMessages,
    setMessageSeen,
    ArrayUserToggle,
    stepNotifications
}