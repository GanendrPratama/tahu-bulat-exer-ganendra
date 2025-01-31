import { NextResponse } from "next/server";

interface RandomUserResponse {
  results: [{
    name: {
      first: string;
      last: string;
    }
  }]
}

export async function GET() {
  try {
    const response = await fetch('https://randomuser.me/api/');
    if (!response.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch random user' },
        { status: 500 }
      );
    }

    const data: RandomUserResponse = await response.json();
    const user = data.results[0];

    return NextResponse.json({
      firstname: user.name.first,
      lastname: user.name.last,
    });
  } catch (error) {
    console.error('Error fetching random user:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}