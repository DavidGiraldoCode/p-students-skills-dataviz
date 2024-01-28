const stopwords = new Set("first,different,way,get,now,want,expect,use,time,big,part,like,end,i,me,my,myself,we,us,our,ours,ourselves,you,your,yours,yourself,yourselves,he,him,his,himself,she,her,hers,herself,it,its,itself,they,them,their,theirs,themselves,what,which,who,whom,whose,this,that,these,those,am,is,are,was,were,be,been,being,have,has,had,having,do,does,did,doing,will,would,should,can,could,ought,i'm,you're,he's,she's,it's,we're,they're,i've,you've,we've,they've,i'd,you'd,he'd,she'd,we'd,they'd,i'll,you'll,he'll,she'll,we'll,they'll,isn't,aren't,wasn't,weren't,hasn't,haven't,hadn't,doesn't,don't,didn't,won't,wouldn't,shan't,shouldn't,can't,cannot,couldn't,mustn't,let's,that's,who's,what's,here's,there's,when's,where's,why's,how's,a,an,the,and,but,if,or,because,as,until,while,of,at,by,for,with,about,against,between,into,through,during,before,after,above,below,to,from,up,upon,down,in,out,on,off,over,under,again,further,then,once,here,there,when,where,why,how,all,any,both,each,few,more,most,other,some,such,no,nor,not,only,own,same,so,than,too,very,say,says,said,shall".split(","))

function getTopWords(wordsArray) {
    // Count the frequency of each word
    const wordFrequency = {};
    wordsArray.forEach(word => {
        wordFrequency[word] = (wordFrequency[word] || 0) + 1;
    });

    // Convert the frequency object to an array of objects
    const frequencyArray = Object.entries(wordFrequency).map(([word, count]) => ({ word, count }));

    // Sort the array based on word frequency in descending order
    frequencyArray.sort((a, b) => b.count - a.count);

    // Take the top 10 words with frequency
    const topWords = frequencyArray.slice(0, 50).map(item => ({ word: item.word, count: item.count }));
    return topWords;
}

function getConcatenatedAbout(about){
    return "".concat(...about.interest, ...about.expectation, ...about.relevant_exp, ...about.futureProjections);
}

function getWordsArray(paragraph) {
    return paragraph.split(/[\s.]+/g)
        .map(w => w.replace(/^[“‘"\-—()\[\]{}]+/g, ""))
        .map(w => w.replace(/[;:.!?()\[\]{},"'’”\-—]+$/g, ""))
        .map(w => w.replace(/['’]s$/g, ""))
        .map(w => w.substring(0, 30))
        .map(w => w.toLowerCase())
        .filter(w => w && !stopwords.has(w));
}

function countUniqueCoincidences(studentA, studentB) {
    // Convert arrays to sets to get unique words
    const setA = new Set(studentA);
    const setB = new Set(studentB);
  
    // Find the intersection of the two sets
    const intersection = [...setA].filter(word => setB.has(word));
  
    // Return the count of unique coincidences
    return intersection.length;
  }

export {getTopWords, getWordsArray, countUniqueCoincidences, getConcatenatedAbout}