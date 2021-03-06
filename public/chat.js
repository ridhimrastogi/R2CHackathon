
$(function(){
   	//make connection
	var socket = io.connect('http://localhost:3000')

	//buttons and inputs
	var message = $("#message")
	var username = $("#username")
	var send_message = $("#send_message")
	var send_username = $("#send_username")
	var chatroom = $("#chatroom")
	var feedback = $("#feedback")

	//Emit message
	send_message.click(function(){
		socket.emit('new_message', {message : message.val()})
	})

	//Listen on new_message
	socket.on("new_message", (data) => {
		feedback.html('');
		message.val('');
		chatroom.append("<p class='message'>" + data.username + ": " + data.message  + "</p>");
		parse_message(data.message,chatroom);
	})

	//Emit a username
	send_username.click(function(){
		socket.emit('change_username', {username : username.val()})
	})

	//Emit typing
	message.bind("keypress", () => {
		socket.emit('typing')
	})

	//Listen on typing
	socket.on('typing', (data) => {
		feedback.html("<p><i>" + data.username + " is typing a message..." + "</i></p>")
	})
});





function parse_message(message, chatroom) {
	//message = message.removeStopWords();
	//Case 1: Check Validity
	if (message.includes("landlord") &&  message.includes("evict")) {
		message = handle_case1(chatroom);
	}
	//Case 2: Summon and hearing date
	else if (message.includes("summons") &&  message.includes("hearing")) {
		message = handle_case2(chatroom);
	}
	//Case 3: Counterclaim
	else if (message.includes("file") &&  message.includes("counterclaim")) {
		message = handle_case3(chatroom);	
	}
	//Case 4: Prepare for a trial
	else if (message.includes("prepare") &&  message.includes("trial")) {
		message = handle_case4(chatroom);	
	}
	//Case 5: Settling out of court
	else if (message.includes("settl") &&  message.includes("no")) {
		message = handle_case5(chatroom);	
	}
	//Case 6: Trial events
	else if (message.includes("happens") &&  message.includes("trial")) {
		message = handle_case6(chatroom);	
	}
	//Case 7: After the trial - Defeat
	else if (message.includes("lost") &&  message.includes("trial")) {
		message = handle_case7(chatroom);	
	}
	//Case 8: Exit
	else if (message.includes("Thank you") ) {
		handle_exit_case(chatroom);	
	}
	else {
		handle_fail_case(chatroom);
	}
}

function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
  }

async function handle_case1(chatroom) {
	await sleep(1000);
	chatroom.append("<p class='bot-message'>" + "You have come to the right place. Calm down and give me the details." + "</p>");
	//return "nothing";
}

async function handle_case2(chatroom) {
	await sleep(1000);
	var result = "Something doesn't seem right. You should recieve summons atleast 2 days before the hearing date.";
	chatroom.append("<p class='bot-message text-wrap'>" + result + "</p>");
	
	result = "Try informing the magistrate and asking for an extension. In the mean time you should prepare an answer or decide if you want to file a counterclaim.";
	await sleep(1500);
	chatroom.append("<p class='bot-message'>" + result + "</p>");
	//return "nothing";
}

async function handle_case3(chatroom) {
	await sleep(1000);
	var result = "To file a counterclaim, you need to write an \
	answer to the complaint you get. Write what \
	your claim is and your answer to what the plaintiff says under the heading 'Answer and Counterclaim.'";
	chatroom.append("<p class='bot-message'>" + result + "</p>");

	result = "Take the written answer and counterclaim to the clerk of court on or before the day of \
	your trial and pay a $96 filing fee or complete the Petition to Sue as Indigent Form. Don't forget to include a signed statement of how you will give \
	these papers to the defendant, which you can \
	do in person or by regular mail."
	await sleep(1500);
	chatroom.append("<p class='bot-message'>" + result + "</p>");

	result = "Remember to finish this before the time set for the trial.";
	await sleep(1500);
	chatroom.append("<p class='bot-message'>" + result + "</p>");
	//return "nothing";
}

async function handle_case4(chatroom) {
	await sleep(1000);
	var result = "Follow these steps to prepare for the trial.";
	chatroom.append("<p class='bot-message'>" + result + "</p>");

	result = "1. Gather your evidence. Get together any materials \
	you have that will help you prove your side of the story,\
	Bring them with you when you come to court.";
	await sleep(2000);
	chatroom.append("<p class='bot-message'>" + result + "</p>");

	result = "2. Witnesses. Anyone who has first-hand knowledge \
	about the case can be a witness - friends, family members, strangers, even a child. Be sure and tell your witnesses when and where the case will be heard.";
	await sleep(2000);
	chatroom.append("<p class='bot-message'>" + result + "</p>");

	
	result = "3. Practice what you are going to say. Before you go \
	to court, practice. Think about what questions the other \
	side and the judge may ask you in court. Think about \
	how you should answer them.";
	await sleep(2000);
	chatroom.append("<p class='bot-message'>" + result + "</p>");

	result = "4. Visit the Court. If you have time, go to Small Claims Court to see what it's like. This can be especially \
	helpful if you've never been in court. Small Claims Court is much more informal than other courtrooms.";
	await sleep(2000);
	chatroom.append("<p class='bot-message'>" + result + "</p>");

	result = "Have you considered settling out of court?";
	await sleep(2000);
	chatroom.append("<p class='bot-message'>" + result + "</p>");
	//return "nothing";
}

async function handle_case5(chatroom) {
	await sleep(1000);
	var result = "Good. You shouldn't just settle to keep from going to court";
	chatroom.append("<p class='bot-message'>" + result + "</p>");

	result = "If you do reach a settlement before the \
	court hearing, you do not need to go to the trial. Make sure to check with \
	the clerk of court before your trial date to be sure that the plaintiff \
	has really dismissed the case.";
	await sleep(1500);
	chatroom.append("<p class='bot-message'>" + result + "</p>");
}

async function handle_case6(chatroom) {
	await sleep(1000);
	var result = "Here's the usual order of events at the trial.";
	chatroom.append("<p class='bot-message'>" + result + "</p>");

	result = "The Oath. All those giving evidence or testimony during the trial must swear or affirm that they will tell the \
	truth. This includes plaintiff, defendant, and witnesses.";
	await sleep(1500);
	chatroom.append("<p class='bot-message'>" + result + "</p>");

	result = "The Plaintiff’s Case. The magistrate asks the plaintiff \
	to present his or her case first, including any evidence and witnesses. The defendant gets to ask \
	questions of the plaintiff and each of the plaintiff’s witnesses after each one testifies.";
	await sleep(1500);
	chatroom.append("<p class='bot-message'>" + result + "</p>");

	result = "The Defendant's Side. The defendant then presents \
	that side of the case, with any evidence and witnesses. The plaintiff gets to ask questions of the defendant and each of the defendant's witnesses after each \
	testifies.";
	await sleep(1500);
	chatroom.append("<p class='bot-message'>" + result + "</p>");

	result = "The Magistrate Reaches a Judgment. The magistrate reviews the evidence and reaches a decision, \
	which is called a judgment and explained in detail in \
	the next section. No more evidence can be given to \
	the magistrate after the trial.";
	await sleep(1500);
	chatroom.append("<p class='bot-message'>" + result + "</p>");
}

async function handle_case7(chatroom) {
	await sleep(1000);
	var result = "Remember if you lose you can always appeal.";
	chatroom.append("<p class='bot-message'>" + result + "</p>");

	result = "After the judgment in Small Claims Court, you \
	can appeal to get a new trial in District Court. To appeal, you must either tell the magistrate at the trial after \
	the decision is made or file a written Notice of Appeal to \
	District Court form with the clerk within 10 calendar \
	days from the date of the judgment. If you file a written \
	notice, you must mail a copy of it to the other side within 10 calendar days of the judgment.";
	await sleep(1500);
	chatroom.append("<p class='bot-message'>" + result + "</p>");
}

async function handle_exit_case(chatroom) {
	await sleep(2000);
	chatroom.append("<p class='bot-message'>" + "Glad I could help. Wish you all the best for the trial." + "</p>");
	//return "nothing";
}

async function handle_fail_case(chatroom) {
	await sleep(2000);
	var result = "Sorry, we cannot help you right now. Why do not you try the office of legal aid. Here are their contact details";
	chatroom.append("<p class='bot-message'>" + result + "</p>");

	result = "Legal Aid of North Carolina, Inc. Call 866-219-5262, or apply online at http://ww2.legalaidnc.org/apply";
	await sleep(5000);
	chatroom.append("<p class='bot-message'>" + result + "</p>");
}


String.prototype.removeStopWords = function() {
	var x;
	var y;
	var word;
	var stop_word;
	var regex_str;
	var regex;
	var cleansed_string = this.valueOf();
	var stop_words = new Array(
		'a',
		'about',
		'above',
		'across',
		'after',
		'again',
		'against',
		'all',
		'almost',
		'alone',
		'along',
		'already',
		'also',
		'although',
		'always',
		'among',
		'an',
		'and',
		'another',
		'any',
		'anybody',
		'anyone',
		'anything',
		'anywhere',
		'are',
		'area',
		'areas',
		'around',
		'as',
		'ask',
		'asked',
		'asking',
		'asks',
		'at',
		'away',
		'b',
		'back',
		'backed',
		'backing',
		'backs',
		'be',
		'became',
		'because',
		'become',
		'becomes',
		'been',
		'before',
		'began',
		'behind',
		'being',
		'beings',
		'best',
		'better',
		'between',
		'big',
		'both',
		'but',
		'by',
		'c',
		'came',
		'can',
		'cannot',
		'case',
		'cases',
		'certain',
		'certainly',
		'clear',
		'clearly',
		'come',
		'could',
		'd',
		'did',
		'differ',
		'different',
		'differently',
		'do',
		'does',
		'done',
		'down',
		'down',
		'downed',
		'downing',
		'downs',
		'during',
		'e',
		'each',
		'early',
		'either',
		'end',
		'ended',
		'ending',
		'ends',
		'enough',
		'even',
		'evenly',
		'ever',
		'every',
		'everybody',
		'everyone',
		'everything',
		'everywhere',
		'f',
		'face',
		'faces',
		'fact',
		'facts',
		'far',
		'felt',
		'few',
		'find',
		'finds',
		'first',
		'for',
		'four',
		'from',
		'full',
		'fully',
		'further',
		'furthered',
		'furthering',
		'furthers',
		'g',
		'gave',
		'general',
		'generally',
		'get',
		'gets',
		'give',
		'given',
		'gives',
		'go',
		'going',
		'good',
		'goods',
		'got',
		'great',
		'greater',
		'greatest',
		'group',
		'grouped',
		'grouping',
		'groups',
		'h',
		'had',
		'has',
		'have',
		'having',
		'he',
		'her',
		'here',
		'herself',
		'high',
		'high',
		'high',
		'higher',
		'highest',
		'him',
		'himself',
		'his',
		'how',
		'however',
		'i',
		'if',
		'important',
		'in',
		'interest',
		'interested',
		'interesting',
		'interests',
		'into',
		'is',
		'it',
		'its',
		'itself',
		'j',
		'just',
		'k',
		'keep',
		'keeps',
		'kind',
		'knew',
		'know',
		'known',
		'knows',
		'l',
		'large',
		'largely',
		'last',
		'later',
		'latest',
		'least',
		'less',
		'let',
		'lets',
		'like',
		'likely',
		'long',
		'longer',
		'longest',
		'm',
		'made',
		'make',
		'making',
		'man',
		'many',
		'may',
		'me',
		'member',
		'members',
		'men',
		'might',
		'more',
		'most',
		'mostly',
		'mr',
		'mrs',
		'much',
		'must',
		'my',
		'myself',
		'n',
		'necessary',
		'need',
		'needed',
		'needing',
		'needs',
		'never',
		'new',
		'new',
		'newer',
		'newest',
		'next',
		'no',
		'nobody',
		'non',
		'noone',
		'not',
		'nothing',
		'now',
		'nowhere',
		'number',
		'numbers',
		'o',
		'of',
		'off',
		'often',
		'old',
		'older',
		'oldest',
		'on',
		'once',
		'one',
		'only',
		'open',
		'opened',
		'opening',
		'opens',
		'or',
		'order',
		'ordered',
		'ordering',
		'orders',
		'other',
		'others',
		'our',
		'out',
		'over',
		'p',
		'part',
		'parted',
		'parting',
		'parts',
		'per',
		'perhaps',
		'place',
		'places',
		'point',
		'pointed',
		'pointing',
		'points',
		'possible',
		'present',
		'presented',
		'presenting',
		'presents',
		'problem',
		'problems',
		'put',
		'puts',
		'q',
		'quite',
		'r',
		'rather',
		'really',
		'right',
		'right',
		'room',
		'rooms',
		's',
		'said',
		'same',
		'saw',
		'say',
		'says',
		'second',
		'seconds',
		'see',
		'seem',
		'seemed',
		'seeming',
		'seems',
		'sees',
		'several',
		'shall',
		'she',
		'should',
		'show',
		'showed',
		'showing',
		'shows',
		'side',
		'sides',
		'since',
		'small',
		'smaller',
		'smallest',
		'so',
		'some',
		'somebody',
		'someone',
		'something',
		'somewhere',
		'state',
		'states',
		'still',
		'still',
		'such',
		'sure',
		't',
		'take',
		'taken',
		'than',
		'that',
		'the',
		'their',
		'them',
		'then',
		'there',
		'therefore',
		'these',
		'they',
		'thing',
		'things',
		'think',
		'thinks',
		'this',
		'those',
		'though',
		'thought',
		'thoughts',
		'three',
		'through',
		'thus',
		'to',
		'today',
		'together',
		'too',
		'took',
		'toward',
		'turn',
		'turned',
		'turning',
		'turns',
		'two',
		'u',
		'under',
		'until',
		'up',
		'upon',
		'us',
		'use',
		'used',
		'uses',
		'v',
		'very',
		'w',
		'want',
		'wanted',
		'wanting',
		'wants',
		'was',
		'way',
		'ways',
		'we',
		'well',
		'wells',
		'went',
		'were',
		'what',
		'when',
		'where',
		'whether',
		'which',
		'while',
		'who',
		'whole',
		'whose',
		'why',
		'will',
		'with',
		'within',
		'without',
		'work',
		'worked',
		'working',
		'works',
		'would',
		'x',
		'y',
		'year',
		'years',
		'yet',
		'you',
		'young',
		'younger',
		'youngest',
		'your',
		'yours',
		'z'
	)
		
	// Split out all the individual words in the phrase
	words = cleansed_string.match(/[^\s]+|\s+[^\s+]$/g)

	// Review all the words
	for(x=0; x < words.length; x++) {
		// For each word, check all the stop words
		for(y=0; y < stop_words.length; y++) {
			// Get the current word
			word = words[x].replace(/\s+|[^a-z]+/ig, "");	// Trim the word and remove non-alpha
			
			// Get the stop word
			stop_word = stop_words[y];
			
			// If the word matches the stop word, remove it from the keywords
			if(word.toLowerCase() == stop_word) {
				// Build the regex
				regex_str = "^\\s*"+stop_word+"\\s*$";		// Only word
				regex_str += "|^\\s*"+stop_word+"\\s+";		// First word
				regex_str += "|\\s+"+stop_word+"\\s*$";		// Last word
				regex_str += "|\\s+"+stop_word+"\\s+";		// Word somewhere in the middle
				regex = new RegExp(regex_str, "ig");
			
				// Remove the word from the keywords
				cleansed_string = cleansed_string.replace(regex, " ");
			}
		}
	}
	return cleansed_string.replace(/^\s+|\s+$/g, "");
}

