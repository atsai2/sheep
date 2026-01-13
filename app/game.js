function test_hand_states()
{
  // High Card
  let arr = [1,2,3,4,13]
  console.log("Hand: " + arr + "\nExpected Result: [0,4]");
  console.log(get_hand_state(arr));

  // One Pair
  arr = [1,1,3,4,13]
  console.log("Hand: " + arr + "\nExpected Result: [1,1]");
  console.log(get_hand_state(arr));

  // Two Pair
  arr = [1,1,3,3,13]
  console.log("Hand: " + arr + "\nExpected Result: [2,3]");
  console.log(get_hand_state(arr));

  // Three of a Kind
  arr = [1,1,1,4,13]
  console.log("Hand: " + arr + "\nExpected Result: [3,1]");
  console.log(get_hand_state(arr));

  // Straight
  arr = [1,2,3,4,18]
  console.log("Hand: " + arr + "\nExpected Result: [4,5]");
  console.log(get_hand_state(arr));

  // Flush
  arr = [1,1,3,4,7]
  console.log("Hand: " + arr + "\nExpected Result: [5,7]");
  console.log(get_hand_state(arr));

  // Full House
  arr = [1,1,3,3,3]
  console.log("Hand: " + arr + "\nExpected Result: [6,3]");
  console.log(get_hand_state(arr));

  // Four of a Kind
  arr = [1,1,1,1,13]
  console.log("Hand: " + arr + "\nExpected Result: [7,1]");
  console.log(get_hand_state(arr));

  // Straight Flush
  arr = [1,2,3,4,5]
  console.log("Hand: " + arr + "\nExpected Result: [8,5]");
  console.log(get_hand_state(arr));

  // Royal Flush
  arr = [8,9,10,11,12]
  console.log("Hand: " + arr + "\nExpected Result: [9,12]");
  console.log(get_hand_state(arr));
}


function get_hand_state(hand){

hand = sort_hand(hand);
console.log(hand);
let hand_state = [0, hand[4]];



let flush = 0;
let straight = 0;

let dupe_list = check_dupes(hand);

for(let i = 0; i < hand.length; i++)
{
  let card_num = hand[i];
  let card_info = get_card_info(card_num);
  if(i == 0)
  {
    for(let iterator = 1; iterator < 5; iterator++)
    {
      let check_card = get_card_info(hand[iterator]);
      let check_card_num = (check_card[1] * 13) + check_card[0];
    //  console.log(check_card);
      if(check_card_num == card_num + iterator)
        {
      //  console.log("straight")
          straight = check_card[0]
        }
      else
        {
          straight = 0;
        }
      if(check_card[1] == card_info[1])
        {
    //    console.log("flush")
          flush = check_card[0]
        }
      else
        {
          flush = 0;
        }
    }
  }

}
  let final_list = sort_dupes(dupe_list);
  let num_dupes = final_list.length;

  if(num_dupes > 0)
    {
      let sum = 0;
      for(let i = 0; i < num_dupes; i++)
      {
        sum+= final_list[i][0];
      }

      hand_state[1] = final_list[num_dupes - 1][1];
      if(num_dupes == 1)
        {
          if(sum == 2)
            {
              hand_state[0] = 1;
            }
          if(sum == 3)
            {
              hand_state[0] = 3;
            }
          if(sum == 4)
            {
              hand_state[0] = 7;
            }

        }
      if(num_dupes == 2)
        {
          if(sum == 4)
            {
              hand_state[0] = 2;
            }
          if(sum == 5)
            {
              hand_state[0] = 6;
            }
        }
    }
  if(straight != 0)
    {
      hand_state[1] = straight;
      if(hand_state[0] < 4){hand_state[0] = 4;} 
    }

  if(flush != 0)
    {
      hand_state[1] = flush;

      if(straight != 0)
      {
        if(flush == 11)
          {
            hand_state[0] = 9
          }
        else
          {
            hand_state[0] = 8;
          }
      }
      else
        {
          if(hand_state[0] < 5){hand_state[0] = 5;}
        }
    }

  hand_state[1] = get_val(hand_state[1]);



  return hand_state;
}

function get_val(card_num)
{
  let card_info = get_card_info(card_num);
  return card_info[0];
}

function get_suit(card_num)
{
  let card_info = get_card_info(card_num);
  return card_info[1];
}

function check_dupes(hand){
let dupe_list = {};

for(let i = 0; i < hand.length; i++)
{
  if(hand[i] in dupe_list)
    {
      dupe_list[hand[i]]+= 1;
    }
  else
    {
      dupe_list[hand[i]] = 1;
    }
}

for(let i  = 0; i < hand.length;i++)
{
  if(dupe_list[hand[i]] == 1)
    {
      delete dupe_list[hand[i]]
    }
}
  return dupe_list;
}

function get_card_info(card_num)
{
  return [card_num % 13, Math.floor(card_num / 13)];
}

function sort_dupes(dupes_list)
{
  let keys = Object.keys(dupes_list);

  let final_list = [];

  for(let i = 0;i < keys.length; i++)
  {
    final_list[i] = [dupes_list[keys[i]], keys[i]];
  }

  final_list = final_list.sort();

  return final_list;
}

function sort_hand(hand)
{
  let temp_list = [];

  for(let i = 0; i < hand.length; i++)
  {
    let card_info = get_card_info(hand[i]);
  //  console.log(card_info);
    temp_list[i] = [card_info[0] % 13, (card_info[1] * 13) + card_info[0]];
  }
  temp_list = temp_list.sort();


  let final_list = [];

  for(let i = 0; i < temp_list.length; i++)
  {
    final_list[i] = temp_list[i][1];
  }


  return final_list;
}
