function test_hand_states()
{
  // High Card
  let arr = [
    [1,0],
    [2,0],
    [3,1],
    [4,2],
    [7,3]
  ];
  console.log("Hand:");
  print_2d(arr);
  console.log("Expected: [0,7]");
  console.log(get_hand_state(arr));
  console.log("-----------------------------");

  // One Pair
  arr = [
    [1,0],
    [1,0],
    [3,1],
    [4,2],
    [7,3]
  ];
  console.log("Hand:");
  print_2d(arr);
  console.log("Expected: [1,1]");
  console.log(get_hand_state(arr));
  console.log("-----------------------------");

  // Two Pair
  arr = [
    [1,0],
    [1,0],
    [3,1],
    [3,2],
    [7,3]
  ];
  console.log("Hand:");
  print_2d(arr);
  console.log("Expected: [2,3]");
  console.log(get_hand_state(arr));
  console.log("-----------------------------");

  // Three of a Kind
  arr = [
    [1,0],
    [1,0],
    [1,1],
    [4,2],
    [7,3]
  ];
  console.log("Hand:");
  print_2d(arr);
  console.log("Expected: [3,1]");
  console.log(get_hand_state(arr));
  console.log("-----------------------------");

  // Straight
  arr = [
    [1,0],
    [2,0],
    [3,1],
    [4,2],
    [5,3]
  ];
  console.log("Hand:");
  print_2d(arr);
  console.log("Expected: [4,5]");
  console.log(get_hand_state(arr));
  console.log("-----------------------------");

  // Flush
  arr = [
    [1,0],
    [2,0],
    [3,0],
    [4,0],
    [7,0]
  ];
  console.log("Hand:");
  print_2d(arr);
  console.log("Expected: [5,7]");
  console.log(get_hand_state(arr));
  console.log("-----------------------------");

  // Full House
  arr = [
    [1,0],
    [1,0],
    [1,1],
    [3,2],
    [3,3]
  ];
  console.log("Hand:");
  print_2d(arr);
  console.log("Expected: [6,1]");
  console.log(get_hand_state(arr));
  console.log("-----------------------------");

  // Four of a Kind
  arr = [
    [1,0],
    [1,0],
    [1,1],
    [1,2],
    [7,3]
  ];
  console.log("Hand:");
  print_2d(arr);
  console.log("Expected: [7,1]");
  console.log(get_hand_state(arr));
  console.log("-----------------------------");

  // Straight Flush
  arr = [
    [1,0],
    [2,0],
    [3,0],
    [4,0],
    [5,0]
  ];
  console.log("Hand:");
  print_2d(arr);
  console.log("Expected: [8,5]");
  console.log(get_hand_state(arr));
  console.log("-----------------------------");

  // Royal Flush
  arr = [
    [8,0],
    [9,0],
    [10,0],
    [11,0],
    [12,0]
  ];
  console.log("Hand:");
  print_2d(arr);
  console.log("Expected: [9,12]");
  console.log(get_hand_state(arr));
  console.log("-----------------------------");


}


function get_hand_state(hand)
{
  hand = hand.sort(sort_hand);
  // print_2d(hand);

  let hand_state = [0,hand[4][0]];

  let straight = 0;
  let flush = 0;

  for(let i = 1; i < hand.length; i++)
  {
    if(hand[i][0] == hand[0][0] + i) // Checks if sequential
    {
      straight = hand[i][0];
    }
    else
    {
      straight = 0;
    }

    if(hand[i][1] == hand[0][1]) // Checks if same suit
    {
      flush = hand[i][0];
    }
    else
    {
      flush = 0;
    }
  }

  let dupe_dict = check_dupes(hand);
  let dupe_list = dict_to_2d(dupe_dict);
  dupe_list = dupe_list.sort(sort_dupes);
  //print_2d(dupe_list);

  let num_dupes = dupe_list.length;

  if(num_dupes > 0)
  {
    hand_state[1] = dupe_list[num_dupes - 1][0];
    let sum = 0;
    for(let i = 0; i < num_dupes; i++)
    {
      sum += dupe_list[i][1];
    }
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
    hand_state[0] = 4;
  }

  if(flush != 0)
  {
    hand_state[1] = flush;

    if(hand_state[0] < 5){hand_state[0] = 5;}
    if(straight != 0)
    {
      if(flush == 12)
      {
        hand_state[0] = 9;
      }
      else
      {
        hand_state[0] = 8;
      }
    }
  }

  return hand_state;
}

function check_dupes(hand)
{
  let dupe_list = {};

  for(let i = 0; i < hand.length; i++)
  {
    if(hand[i][0] in dupe_list)
    {
      dupe_list[hand[i][0]]++;
    }
    else
    {
      dupe_list[hand[i][0]] = 1;
    }
  }

  for(let i = 0; i < hand.length;i++)
  {
    if(dupe_list[hand[i][0]] == 1)
    {
      delete dupe_list[hand[i][0]];
    }
  }

  return dupe_list;
}

function dict_to_2d(dict)
{
  let final_list = [];

  let keys = Object.keys(dict);

  for(let i = 0; i < keys.length; i++)
  {
    final_list.push([keys[i],dict[keys[i]]]);
  }

  return final_list;
}

function sort_hand(x, y)
{
  if(x[0] == y[0])
    {
      return 0;
    }
    else
      {
        return (x[0] < y[0]) ? -1 : 1;
      }
}

function sort_dupes(x, y)
{
  if(x[1] == y[1])
    {
      return 0;
    }
    else
      {
        return (x[1] < y[1]) ? -1 : 1;
      }
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

function print_2d(arr)
{
  for(let i = 0; i < arr.length; i++)
  {
    console.log(arr[i]);
  }
}

function get_card_info(card_num)
{
  return [card_num % 13, Math.floor(card_num / 13)];
}
