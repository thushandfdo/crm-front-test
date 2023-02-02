const base = 'https://localhost:7143/api/';

export const _POST = async (url, body) => {
    url = base + url;
    
    var flag = {
        test: false
    };

    await fetch(url, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(body)
    }).then((response) => {
        if (response.ok) {
            // console.log(response.json());
            flag.test = true;
            // console.log(flag);
            return flag;
        }
        throw new Error('Something went wrong');
    }).catch(() => {
        alert("Insertion failed...!");
        console.log("Insertion Error...!");
        flag.test = false;
        return flag;
    }).finally(() => {
        console.log("Test");
        return flag;
    });

    // console.log(flag);

    return flag;
}

// fetch('https://localhost:7143/api/Note')
//             .then(res => {
//                 if (res.ok){
//                     setError(false);
//                     return res.json();
//                 }
//                 throw new Error();
//             })
//             .then(data => {
//                 setNotes(data);
//             })
//             .catch(() => {
//                 setError(true);
//                 console.log("Can not fetch data...!");
//             });

// await fetch('https://localhost:7143/api/Note/' + id, {
//             method: 'DELETE'
//         }).then(res => {
//             if (res.ok){
//                 console.log(res.json());
//                 return;
//             }
//             throw new Error();
//         }).catch(() => {
//             alert("Deletion Error...!");
//             console.log("Deletion error...!");
//         });