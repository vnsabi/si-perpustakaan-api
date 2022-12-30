import { Injectable } from '@nestjs/common';

@Injectable()
export class AlgorithmService {

	async	kmpSearch(
		keyword: string,
		dataArr: any[],
		keyField: string
	) {
		let result = [];
    for(let data of dataArr) {
			let searched = await this.kmpLogic(keyword, data[keyField]);
			// more than 0 is matched, so push to result array
			if(searched >= 0) {
				result.push(data)
			}
    }
    return result;
	}

  private async kmpLogic(
		pattern: string, 
		text: string
	): Promise<number> {
		pattern = pattern.toLowerCase();
    text = text.toLowerCase();
    if (pattern.length == 0)
      return 0; // Immediate match

    // Compute longest suffix-prefix table
    var lsp = [0]; // Base case
    for (var i = 1; i < pattern.length; i++) {
			var j = lsp[i - 1]; // Start by assuming we're extending the previous LSP
			while (j > 0 && pattern[i] !== pattern[j])
			j = lsp[j - 1];
			if (pattern[i] === pattern[j])
			j++;
			lsp.push(j);
    }

    // Walk through text string
    var j = 0; // Number of chars matched in pattern
    for (var i = 0; i < text.length; i++) {
			while (j > 0 && text[i] != pattern[j])
			j = lsp[j - 1]; // Fall back in the pattern
			if (text[i]  == pattern[j]) {
				j++; // Next char matched, increment position
				if (j == pattern.length)
				return i - (j - 1);
			}   
    }
		
    return -1; // Not found
	}

}
